import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsRelations, Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { User } from '@/Entities'
import {
  MessageGroupDto,
  RequestMessageGroupsDto,
  ResponseMessageGroupsDto,
} from '@/MessageGroup/Dtos'
import { UserService } from '@/User/user.service'
import { UserCredentials } from '@/Types/RequestWithUser'
import { MessageDto } from "@/Message/Dtos";

@Injectable()
export class MessageGroupService {
  constructor(
    @InjectRepository(MessageGroup)
    private readonly _messageGroupRepo: Repository<MessageGroup>,
    @InjectRepository(User)
    private readonly _usersRepo: Repository<User>,
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
  ) {}

  public async createGroup(rootUserId: number): Promise<MessageGroupDto> {
    const rootUser: User | null = await this._usersRepo.findOneBy({
      id: rootUserId,
    })

    if (!rootUser) {
      throw new Error(`user ${rootUserId} not found`)
    }

    const room: MessageGroup = this._messageGroupRepo.create()
    room.users = [rootUser]
    room.rootUser = rootUser

    const result = await this._messageGroupRepo.save(room)

    return plainToInstance(MessageGroupDto, result)
  }

  public async getGroup(
    id: number,
    relations: FindOptionsRelations<MessageGroup> = {},
  ): Promise<MessageGroupDto | null> {
    const group: MessageGroup | null = await this._messageGroupRepo.findOne({
      where: { id },
      relations,
    })

    if (!group) {
      return null
    }

    return plainToInstance(MessageGroupDto, group)
  }

  public async getGroupOrThrow(
    id: number,
    relations: FindOptionsRelations<MessageGroup> = {},
  ): Promise<MessageGroupDto> {
    const group: MessageGroupDto | null = await this.getGroup(id, relations)

    if (!group) {
      throw new Error(`group ${id} does not exist`)
    }

    return group
  }

  public async containsUser(groupId: number, userId: number): Promise<boolean> {
    const group: MessageGroupDto = await this.getGroupOrThrow(groupId, {
      users: true,
    })

    return group.users.map((user) => user.id).includes(userId)
  }

  public async getAll(
    user: UserCredentials,
    filter: RequestMessageGroupsDto,
  ): Promise<ResponseMessageGroupsDto> {
    const [items, count] = await this._messageGroupRepo.findAndCount({
      skip: filter.skip,
      take: filter.limit,
      cache: true,
      where: {
        users: {
          id: user.userId,
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
      },
    })

    return {
      count,
      items: items.map((item) => plainToInstance(MessageGroupDto, item)),
    }
  }

  public async find(
    user: UserCredentials,
    id: number,
  ): Promise<MessageGroupDto> {
    if (!(await this.containsUser(id, user.userId))) {
      throw new BadRequestException('user not in current group')
    }

    const group: MessageGroupDto = await this.getGroupOrThrow(id, {
      users: true,
      rootUser: true,
    })

    return plainToInstance(MessageGroupDto, group)
  }
}
