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
import { UserWsEvent, FriendStatus } from './enums'
import {
  GetFriendsResponseDto,
  GetFriendStatusRequestDto,
  GetFriendStatusResponseDto,
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

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10)
    }

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

  public async getFriends(id: string): Promise<GetFriendsResponseDto> {
    const user: User | null = await this.usersRepo.findOne({
      where: {
        id,
      },
      relations: {
        friends: true,
      },
      select: {
        friends: {
          username: true,
          id: true,
          email: true,
          realName: true,
        },
      },
    })

    if (!user) {
      throw new NotFoundException('user not found')
    }

    return plainToInstance(GetFriendsResponseDto, {
      items: user.friends,
      count: user.friends.length,
    } as GetFriendsResponseDto)
  }

  public async getAll(query: GetUsersRequestDto): Promise<GetUsersResponseDto> {
    const [items, count] = await this.usersRepo.findAndCount({
      skip: query.skip ?? 0,
      take: query.limit ?? 10,
    })

    return plainToInstance(GetUsersResponseDto, {
      items,
      count,
    })
  }

  private _setIsOnline(id: string): void {
    clearTimeout(this.onlineUserIds[id])

    this.onlineUserIds[id] = setTimeout(() => {
      delete this.onlineUserIds[id]
    }, 30_000)
  }

  public async getFriendStatus(
    dto: GetFriendStatusRequestDto,
  ): Promise<GetFriendStatusResponseDto> {
    const user: User | null = await this.usersRepo.findOne({
      where: { id: dto.userId1 },
      relations: {
        friends: true,
        friendRequests: {
          from: true,
          to: true,
        },
      },
    })

    if (!user) {
      throw new NotFoundException()
    }

    let status: FriendStatus = FriendStatus.NONE

    if (user.friends.find((u) => u.id == dto.userId2)) {
      status = FriendStatus.FRIEND
    } else if (user.friendRequests.find((r) => r.from.id === dto.userId1)) {
      status = FriendStatus.SENT_TO
    } else if (user.friendRequests.find((r) => r.to.id === dto.userId1)) {
      status = FriendStatus.SENT_FROM
    }

    return plainToInstance(GetFriendStatusResponseDto, {
      status,
    })
  }

  public async getNonFriends(
    dto: GetUsersRequestDto,
    userId: string,
  ): Promise<GetUsersResponseDto> {
    const { skip = 0, limit = 10 } = dto

    // const data: any[] = await this.dataSource.query<any>(`
    //   SELECT u.*, COUNT(*) OVER () AS __count
    //   FROM users u
    //   WHERE u.id <> '${userId}'
    //     AND NOT EXISTS (SELECT *
    //                     FROM users_friends_users f
    //                     WHERE (f.users_id_1 = '${userId}'
    //                       AND f.users_id_2 = u.id)
    //                        OR (f.users_id_1 = u.id
    //                       AND f.users_id_2 = '${userId}'))
    //   OFFSET ${skip}
    //   LIMIT ${limit};
    // `)

    const subQuery: SelectQueryBuilder<User> = this.usersRepo
      .createQueryBuilder('subQuery')
      .leftJoin('subQuery.friends', 'friend')
      .select('friend.id')
      .where('friend.id = :userId', { userId })

    const query: SelectQueryBuilder<User> = this.usersRepo
      .createQueryBuilder('user')
      .where('user.id != :userId', { userId })
      .andWhere(`user.id NOT IN (${subQuery.getQuery()})`)
      .setParameters(subQuery.getParameters())
      .limit(skip ?? 0)
      .take(limit ?? 10)

    const items: User[] = await query.getMany()
    const count: number = await query.getCount()

    return plainToInstance(GetUsersResponseDto, {
      count,
      items,
    })
  }
}
