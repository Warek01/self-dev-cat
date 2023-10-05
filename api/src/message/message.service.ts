import { BadRequestException, Injectable } from '@nestjs/common'
import { FindOptionsRelations, In, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'

import { MessageGroupService } from '@/message-group/message-group.service'
import { UserService } from '@/user/user.service'
import { MessageGroupDto } from '@/message-group/dto/message-group.dto'
import type { UserCredentials } from '@/types/request-with-user'
import { Message } from '@/entities/message.entity'
import { User } from '@/entities/user.entity'
import { MessageGroup } from '@/entities/message-group.entity'

import {
  CreateMessageDto,
  RequestMessagesDto,
  MessageDto,
  ResponseMessagesDto,
} from './dto'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    private readonly messageGroupService: MessageGroupService,
    private readonly userService: UserService,
  ) {}

  public async createMessage(dto: CreateMessageDto): Promise<MessageDto> {
    const { groupId, userId, content, messageId } = dto

    const message: Message = this.messageRepo.create()
    const group: MessageGroupDto =
      await this.messageGroupService.getGroupOrThrow(groupId)
    const user: User | null = await this.userService.findById(userId)

    message.id = dto.messageId
    message.user = plainToInstance(User, user)
    message.group = plainToInstance(MessageGroup, group)
    message.group.lastMessageTimestamp = new Date()
    message.content = content

    const res: Message = await this.messageRepo.save(message)

    return plainToInstance(MessageDto, res)
  }

  public async getAll(
    user: UserCredentials,
    dto: RequestMessagesDto,
  ): Promise<ResponseMessagesDto> {
    const { groupId, skip, limit } = dto

    if (!(await this.messageGroupService.containsUser(groupId, user.id))) {
      throw new BadRequestException('group does not include user')
    }

    const [items, count] = await this.messageRepo.findAndCount({
      skip,
      take: limit,
      where: {
        group: {
          id: groupId,
        },
      },
      cache: true,
      order: {
        createdAt: 'DESC',
      },
      relations: {
        group: true,
        user: true,
        replies: true,
        repliesTo: true,
        attachments: true,
      },
      select: {
        user: {
          id: true,
        },
        id: true,
        content: true,
        repliesTo: {
          id: true,
        },
        createdAt: true,
        attachments: {
          id: true,
          createdAt: true,
          mime: true,
          name: true,
          updatedAt: true,
          size: true,
        },
      },
    })

    return {
      count,
      items: items.map((item) => plainToInstance(MessageDto, item)),
    }
  }

  public deleteMessages(messages: MessageDto[]): void {
    messages.forEach(({ id }) => {
      this.messageRepo.delete({ id })
    })
  }

  public async findMessages(ids: string[]): Promise<MessageDto[]> {
    if (!ids.length) {
      return []
    }

    const messages: Message[] = await this.messageRepo.find({
      where: {
        id: In(ids),
      },
    })

    return messages.map((message) => plainToInstance(MessageDto, message))
  }

  public async getMessage(
    id: string,
    relations: FindOptionsRelations<Message> = {},
  ): Promise<MessageDto | null> {
    const message: Message | null = await this.messageRepo.findOne({
      where: {
        id,
      },
      relations,
    })

    return plainToInstance(MessageDto, message)
  }

  public async getMessageOrThrow(
    id: string,
    relations: FindOptionsRelations<Message> = {},
  ): Promise<MessageDto> {
    const message: MessageDto | null = await this.getMessage(id, relations)

    if (!message) {
      throw new Error(`message ${id} not found`)
    }

    return message
  }

  public deleteAllMessagesFromGroup(groupId: string): void {
    this.messageRepo.delete({
      group: {
        id: groupId,
      },
    })
  }
}
