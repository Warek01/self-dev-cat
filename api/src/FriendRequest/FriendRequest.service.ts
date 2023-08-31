import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { OperationResponseDto } from '@/Dtos'
import { FriendRequest, User } from '@/Entities'
import { FriendRequestStatus } from './Enums/FriendRequestStatus'
import {
  GetFriendRequestsResponseDto,
  GetFriendsRequestsRequestDto,
} from '@/FriendRequest/Dtos'

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepo: Repository<User>,
    @InjectRepository(FriendRequest)
    private readonly _friendRequestRepo: Repository<FriendRequest>,
  ) {}

  public async addFriend(
    fromUserId: string,
    toUserId: string,
  ): Promise<OperationResponseDto> {
    const user = await this._userRepo.findOneBy({ id: fromUserId })
    const friend = await this._userRepo.findOneBy({ id: toUserId })

    if (!user) {
      throw new NotFoundException(`User ${user} not found`)
    }

    if (!friend) {
      throw new NotFoundException(`User ${friend} not found`)
    }

    // Does not work (always null)

    // const existingRequest = await this._friendRequestRepo.findOne({
    //   where: {
    //     to: friend,
    //     from: user,
    //     status: In([FriendRequestStatus.ACCEPTED, FriendRequestStatus.PENDING]),
    //   },
    //   relations: {
    //     to: true,
    //     from: true
    //   }
    // })

    const existingRequest = await this._friendRequestRepo
      .createQueryBuilder('req')
      .where('req.from_id = :userId', { userId: fromUserId })
      .andWhere('req.to_id = :friendId', { friendId: toUserId })
      .andWhere("req.status IN ('0', '1')")
      .getOne()

    if (existingRequest) {
      throw new ConflictException('Friend request already sent')
    }

    const request = this._friendRequestRepo.create()
    request.from = plainToInstance(User, user)
    request.to = plainToInstance(User, friend)

    await this._friendRequestRepo.save(request)

    return plainToInstance(OperationResponseDto, {
      message: 'success',
    } as OperationResponseDto)
  }

  public async acceptFriendRequest(
    userId: string,
    requestId: string,
  ): Promise<void> {
    const request = await this._friendRequestRepo.findOne({
      where: { id: requestId },
      relations: {
        from: true,
        to: true,
      },
    })

    if (request?.to.id !== userId) {
      throw new BadRequestException()
    }

    const user = await this._userRepo.findOne({
      where: {
        id: request.from.id,
      },
      relations: {
        friends: true,
      },
    })
    const friend = await this._userRepo.findOne({
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

    this._friendRequestRepo.save(request)
    this._userRepo.save(user!)
    this._userRepo.save(friend!)
  }

  public async denyFriendRequest(
    userId: string,
    requestId: string,
  ): Promise<void> {
    const request = await this._friendRequestRepo.findOne({
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
    await this._friendRequestRepo.save(request)
  }

  public async getFriendRequests(
    currentUserId: string,
    query: GetFriendsRequestsRequestDto,
  ): Promise<GetFriendRequestsResponseDto> {
    const [requests, count] = await this._friendRequestRepo.findAndCount({
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
