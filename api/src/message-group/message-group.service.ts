import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsRelations, Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { MessageGroup } from '@/entities/message-group.entity'
import { UserService } from '@/user/user.service'
import type { UserCredentials } from '@/types/request-with-user'
import { User } from '@/entities/user.entity'

import { RequestCreateGroupDto } from './dto/request-create-group.dto'
import { MessageGroupDto } from './dto/message-group.dto'
import { RequestMessageGroupsDto } from './dto/request-message-groups.dto'
import { ResponseMessageGroupsDto } from './dto/response-message-groups.dto'

@Injectable()
export class MessageGroupService {
  constructor(
    @InjectRepository(MessageGroup)
    private readonly messageGroupRepo: Repository<MessageGroup>,
    private readonly userService: UserService,
  ) {}

  public async createGroup(
    requestCreateGroupDto: RequestCreateGroupDto,
  ): Promise<MessageGroupDto> {
    const { userIds, rootUserId, name, groupId } = requestCreateGroupDto
    const rootUser: User | null = await this.userService.findById(rootUserId)

    if (!rootUser) {
      throw new Error(`user ${rootUserId} not found`)
    }

    const room: MessageGroup = this.messageGroupRepo.create()
    const rootUserEntity: User = plainToInstance(User, rootUser)

    room.id = groupId
    room.users = [rootUserEntity]
    room.rootUser = rootUserEntity
    room.name = name

    for (const id of userIds) {
      const user: User | null = await this.userService.findById(id)
      room.users.push(plainToInstance(User, user))
    }

    await this.messageGroupRepo.save(room)

    return plainToInstance(MessageGroupDto, room)
  }

  public async getGroup(
    id: string,
    relations: FindOptionsRelations<MessageGroup> = {},
  ): Promise<MessageGroupDto | null> {
    const group: MessageGroup | null = await this.messageGroupRepo.findOne({
      where: { id },
      relations,
    })

    if (!group) {
      return null
    }

    return plainToInstance(MessageGroupDto, group)
  }

  public async getGroupOrThrow(
    id: string,
    relations: FindOptionsRelations<MessageGroup> = {},
  ): Promise<MessageGroupDto> {
    const group: MessageGroupDto | null = await this.getGroup(id, relations)

    if (!group) {
      throw new Error(`group ${id} does not exist`)
    }

    return group
  }

  public async containsUser(groupId: string, userId: string): Promise<boolean> {
    const group: MessageGroupDto = await this.getGroupOrThrow(groupId, {
      users: true,
    })

    return group.users.map((user) => user.id).includes(userId)
  }

  public async getAll(
    user: UserCredentials,
    filter: RequestMessageGroupsDto,
  ): Promise<ResponseMessageGroupsDto> {
    const [items, count] = await this.messageGroupRepo.findAndCount({
      skip: filter.skip,
      take: filter.limit,
      order: {
        lastMessageTimestamp: 'desc',
      },
      where: {
        users: {
          id: user.id,
        },
      },
      relations: {
        users: true,
      },
      select: {
        id: true,
        createdAt: true,
        users: {
          id: true,
          username: true,
        },
        rootUser: {
          id: true,
          username: true,
        },
        name: true,
        lastMessageTimestamp: true,
      },
    })

    return {
      count,
      items: items.map((item) => plainToInstance(MessageGroupDto, item)),
    }
  }

  public async find(
    user: UserCredentials,
    id: string,
  ): Promise<MessageGroupDto> {
    if (!(await this.containsUser(id, user.id))) {
      throw new BadRequestException('user not in current group')
    }

    const group: MessageGroupDto = await this.getGroupOrThrow(id, {
      users: true,
      rootUser: true,
    })

    return plainToInstance(MessageGroupDto, group)
  }
}
