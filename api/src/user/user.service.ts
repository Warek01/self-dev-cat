import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import {
  FindOptionsRelations,
  FindOptionsSelect,
  Repository,
  SelectQueryBuilder,
} from 'typeorm'
import { WsResponse } from '@nestjs/websockets'
import bcrypt from 'bcrypt'

import { User } from '@/entities/user.entity'

import type { OnlineStatusIdMap } from './user.types'
import { FriendStatus, UserWsEvent } from './enums'
import {
  GetUsersRequestDto,
  GetUsersResponseDto,
  PingUsersStatusRequestDto,
  PingUsersStatusResponseDto,
  UpdateUserDto,
  UserDto,
} from './dto'

@Injectable()
export class UserService {
  public readonly onlineUserIds: Record<string, NodeJS.Timeout> = {}

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  public async updateUser(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<UserDto> {
    const user: User | null = await this.findById(userId)

    if (!user) {
      throw new NotFoundException()
    }

    user.realName = dto.realName ?? user.realName
    user.username = dto.username ?? user.username
    user.password = dto.password
      ? await bcrypt.hash(dto.password, 10)
      : user.password

    await this.usersRepo.save(user)

    return plainToInstance(UserDto, user)
  }

  public async delete(userId: string): Promise<void> {
    await this.usersRepo.delete({ id: userId })
  }

  public async findById(
    id: string,
    relations?: FindOptionsRelations<User>,
    select?: FindOptionsSelect<User>,
  ): Promise<User | null> {
    return await this.usersRepo.findOne({
      where: { id },
      relations,
      select,
    })
  }

  public pingUserStatus(
    dto: PingUsersStatusRequestDto,
  ): WsResponse<PingUsersStatusResponseDto> {
    const statuses: OnlineStatusIdMap[] = []

    dto.ids.forEach((id) => {
      statuses.push({
        userId: id,
        online: !!this.onlineUserIds[id] ?? false,
      })
    })

    return {
      event: UserWsEvent.PING_ONLINE_STATUS,
      data: plainToInstance(PingUsersStatusResponseDto, {
        data: statuses,
      } as PingUsersStatusResponseDto),
    }
  }

  public async getFriends(userId: string): Promise<GetUsersResponseDto> {
    const users: User[] = await this.usersRepo
      .createQueryBuilder('u')
      .where(
        `SELECT u.*
         FROM users u
                INNER JOIN users_friends_users ufu ON (ufu.users_id_1 = :userId AND ufu.users_id_2 = u.id)
           OR (ufu.users_id_1 = u.id AND ufu.users_id_2 = :userId)`,
        { userId },
      )
      .getMany()

    // const user: User | null = await this.usersRepo.findOne({
    //   where: { id: userId },
    //   relations: { friends: true },
    // })
    //
    // if (!user) {
    //   throw new NotFoundException()
    // }

    const dto: GetUsersResponseDto = plainToInstance(GetUsersResponseDto, {
      items: users,
      count: users.length,
    })

    for (const user of dto.items) {
      user.friendStatus = FriendStatus.FRIEND
    }

    return dto
  }

  public async getAll(
    userId: string,
    query: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    const [items, count] = await this.usersRepo.findAndCount({
      skip: query.skip ?? 0,
      take: query.limit ?? 10,
    })

    const dto: GetUsersResponseDto = plainToInstance(GetUsersResponseDto, {
      count,
      items,
    })

    for (const user of dto.items) {
      user.friendStatus = await this.getFriendStatus(userId, user.id)
    }

    return dto
  }

  public async getFriendStatus(
    userId1: string,
    userId2: string,
  ): Promise<FriendStatus> {
    const isFriend: boolean = await this.usersRepo.exist({
      where: {
        id: userId1,
        friends: {
          id: userId2,
        },
      },
      relations: {
        friends: true,
      },
    })

    if (isFriend) {
      return FriendStatus.FRIEND
    }

    const isSentTo: boolean = await this.usersRepo.exist({
      where: {
        id: userId1,
        friendRequests: {
          to: {
            id: userId2,
          },
        },
      },
      relations: {
        friendRequests: {
          to: true,
        },
      },
    })

    if (isSentTo) {
      return FriendStatus.SENT_TO
    }

    const isSentFrom: boolean = await this.usersRepo.exist({
      where: {
        id: userId1,
        friendRequests: {
          from: {
            id: userId2,
          },
        },
      },
      relations: {
        friendRequests: {
          from: true,
        },
      },
    })

    if (isSentFrom) {
      return FriendStatus.SENT_TO
    }

    return FriendStatus.NONE
  }

  public async getNonFriends(
    requestDto: GetUsersRequestDto,
    userId: string,
  ): Promise<GetUsersResponseDto> {
    const { skip = 0, limit = 10 } = requestDto

    const query: SelectQueryBuilder<User> = this.usersRepo
      .createQueryBuilder('u')
      .where(
        `u.id <> :userId AND NOT EXISTS (SELECT *
                  FROM users_friends_users f
                  WHERE (f.users_id_1 = :userId
                    AND f.users_id_2 = u.id)
                     OR (f.users_id_1 = u.id
                    AND f.users_id_2 = :userId))`,
        { userId },
      )
      .limit(skip ?? 0)
      .take(limit ?? 10)

    const items: User[] = await query.getMany()
    const count: number = await query.getCount()

    const dto: GetUsersResponseDto = plainToInstance(GetUsersResponseDto, {
      count,
      items,
    })

    for (const user of dto.items) {
      user.friendStatus = await this.getFriendStatus(userId, user.id)
    }

    return dto
  }

  // private _setIsOnline(id: string): void {
  //   clearTimeout(this.onlineUserIds[id])
  //
  //   this.onlineUserIds[id] = setTimeout(() => {
  //     delete this.onlineUserIds[id]
  //   }, 30_000)
  // }
}
