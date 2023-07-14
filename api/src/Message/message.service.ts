import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'

import { Message, MessageGroup, User } from '@/Entities'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'
import { CreateMessageDto, MessageDto } from '@/Message/Dtos'
import { UserService } from '@/User/user.service'
import { MessageGroupDto } from '@/MessageGroup/Dtos'
import { UserDto } from '@/User/Dtos'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly _messageRepo: Repository<Message>,
    private readonly _messageGroupService: MessageGroupService,
    private readonly _userService: UserService,
  ) {}

  async createMessage(dto: CreateMessageDto): Promise<MessageDto> {
    const { groupId, userId, content } = dto

    const message: Message = this._messageRepo.create()
    const group: MessageGroupDto =
      await this._messageGroupService.getGroupOrThrow(groupId)
    const user: UserDto = await this._userService.getUserOrThrow(userId)

    message.user = plainToInstance(User, user)
    message.group = plainToInstance(MessageGroup, group)
    message.content = content

    const res: Message = await this._messageRepo.save(message)

    return plainToInstance(MessageDto, res)
  }
}
