import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { User } from '@/entities/user.entity'
import { FriendRequest } from '@/entities/friend-request.entity'
import { ActionResponseDto } from '@/dto/action-response.dto'

import {
  GetFriendRequestsRequestDto,
  GetFriendRequestsResponseDto,
} from './dto'

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepo: Repository<FriendRequest>,
  ) {}

  public async addFriend(
    fromUserId: string,
    toUserId: string,
  ): Promise<ActionResponseDto> {
    if (fromUserId === toUserId) {
      throw new BadRequestException()
    }

    const user: User | null = await this.userRepo.findOneBy({ id: fromUserId })
    const friend: User | null = await this.userRepo.findOneBy({ id: toUserId })

    if (!user || !friend) {
      throw new NotFoundException()
    }

    const requestExists: boolean = await this.friendRequestRepo
      .createQueryBuilder('req')
      .where('req.from_id = :fromUserId AND req.to_id = :toUserId', {
        fromUserId,
        toUserId,
      })
      .orWhere('req.to_id = :fromUserId AND req.from_id = :toUserId', {
        fromUserId,
        toUserId,
      })
      .getExists()

    if (requestExists) {
      throw new ConflictException()
    }

    const request: FriendRequest = this.friendRequestRepo.create()
    request.from = user
    request.to = friend

    await this.friendRequestRepo.save(request)

    return plainToInstance(ActionResponseDto, {
      message: 'success',
    })
  }

  public async acceptFriendRequest(frOrUserId: string): Promise<void> {
    const request: FriendRequest =
      (await this.friendRequestRepo.findOne({
        where: { id: frOrUserId },
        relations: {
          from: true,
          to: true,
        },
      })) ??
      ((await this.friendRequestRepo.findOne({
        where: {
          to: {
            id: frOrUserId,
          },
        },
        relations: {
          from: true,
          to: true,
        },
      })) as FriendRequest)

    const user: User = (await this.userRepo.findOne({
      where: {
        id: request.from.id,
      },
      relations: {
        friends: true,
      },
    })) as User

    const friend: User = (await this.userRepo.findOne({
      where: {
        id: request.to.id,
      },
      relations: {
        friends: true,
      },
    })) as User

    user.friends.push(friend)
    // friend.friends.push(user)

    await this.userRepo.save(user)
    await this.friendRequestRepo.remove(request)
    // await this.userRepo.save(friend)
  }

  public async denyFriendRequest(frOrUserId: string): Promise<void> {
    const request: FriendRequest | null =
      (await this.friendRequestRepo.findOne({
        where: { id: frOrUserId },
        relations: {
          from: true,
        },
      })) ??
      ((await this.friendRequestRepo.findOne({
        where: {
          from: {
            id: frOrUserId,
          },
        },
        relations: {
          from: true,
        },
      })) as FriendRequest)

    await this.friendRequestRepo.remove(request)
  }

  public async getFriendRequests(
    currentUserId: string,
    query: GetFriendRequestsRequestDto,
  ): Promise<GetFriendRequestsResponseDto> {
    const [requests, count] = await this.friendRequestRepo.findAndCount({
      where: {
        to: query.outgoing
          ? undefined
          : {
              id: currentUserId,
            },
        from: query.outgoing
          ? {
              id: currentUserId,
            }
          : undefined,
      },
      skip: query.skip ?? 0,
      take: query.limit ?? 10,
      relations: {
        from: true,
        to: true,
      },
      select: {
        id: true,
        createdAt: true,
        from: {
          id: true,
          realName: true,
          username: true,
        },
      },
    })

    return plainToInstance(GetFriendRequestsResponseDto, {
      items: requests,
      count,
    })
  }
}
