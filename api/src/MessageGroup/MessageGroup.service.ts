import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsRelations, Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { User } from '@/Entities'
import { MessageGroupDto } from '@/MessageGroup/Dtos'

@Injectable()
export class MessageGroupService {
  constructor(
    @InjectRepository(MessageGroup)
    private readonly _messageGroupRepo: Repository<MessageGroup>,
    @InjectRepository(User)
    private readonly _usersRepo: Repository<User>,
  ) {}

  public async createGroup(rootUserId: number): Promise<MessageGroupDto> {
    const rootUser: User | null = await this._usersRepo.findOneBy({
      id: rootUserId,
    })

    if (!rootUser) {
      throw new NotFoundException(`user ${rootUserId} not found`)
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

  public async getGroupOrThrow(id: number): Promise<MessageGroupDto> {
    const group: MessageGroupDto | null = await this.getGroup(id)

    if (!group) {
      throw new NotFoundException(`group ${id} does not exist`)
    }

    return group
  }
}
