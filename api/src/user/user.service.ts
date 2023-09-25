import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm'
import { WsResponse } from '@nestjs/websockets'
import bcrypt from 'bcrypt'

import { User } from '@/entities/user.entity'

import type { OnlineStatusIdMap } from './user.types'
import { UserWsEvent } from './enums/user-ws-event'
import {
  UserDto,
  GetUsersResponseDto,
  GetFriendsResponseDto,
  GetUsersRequestDto,
  UpdateUserDto,
  PingUsersStatusResponseDto,
  PingUsersStatusRequestDto,
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
    const user = await this.usersRepo.findOne({
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

  // private _setIsOnline(id: string): void {
  //   clearTimeout(this.onlineUserIds[id])
  //
  //   this.onlineUserIds[id] = setTimeout(() => {
  //     delete this.onlineUserIds[id]
  //   }, 30_000)
  // }
}
