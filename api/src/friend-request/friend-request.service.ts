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

import { FriendRequestStatus } from './enums/friend-request-status'
import { GetFriendRequestsResponseDto } from './dto/get-friend-requests-response.dto'
import { GetFriendRequestsRequestDto } from './dto/get-friend-requests-request.dto'

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
      .andWhere('req.status IN (:...statuses)', {
        statuses: [FriendRequestStatus.PENDING, FriendRequestStatus.ACCEPTED],
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

  public async acceptFriendRequest(
    userId: string,
    requestId: string,
  ): Promise<void> {
    const request = await this.friendRequestRepo.findOne({
      where: { id: requestId },
      relations: {
        from: true,
        to: true,
      },
    })

    if (request?.to.id !== userId) {
      throw new BadRequestException()
    }

    const user = await this.userRepo.findOne({
      where: {
        id: request.from.id,
      },
      relations: {
        friends: true,
      },
    })
    const friend = await this.userRepo.findOne({
      where: {
        id: request.to.id,
      },
      relations: {
        friends: true,
      },
    })

    user!.friends.push(friend!)
    friend!.friends.push(user!)

    request.status = FriendRequestStatus.ACCEPTED

    this.friendRequestRepo.save(request)
    this.userRepo.save(user!)
    this.userRepo.save(friend!)
  }

  public async denyFriendRequest(
    userId: string,
    requestId: string,
  ): Promise<void> {
    const request = await this.friendRequestRepo.findOne({
      where: { id: requestId },
      relations: {
        from: true,
        to: true,
      },
    })

    if (request?.to.id !== userId) {
      throw new BadRequestException()
    }

    request.status = FriendRequestStatus.REJECTED
    await this.friendRequestRepo.save(request)
  }

  public async getFriendRequests(
    currentUserId: string,
    query: GetFriendRequestsRequestDto,
  ): Promise<GetFriendRequestsResponseDto> {
    const [requests, count] = await this.friendRequestRepo.findAndCount({
      where: {
        status: FriendRequestStatus.PENDING,
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
        status: true,
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
