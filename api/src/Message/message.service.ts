import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'

import { Message, MessageGroup, User } from '@/Entities'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'
import {
  CreateMessageDto,
  MessageDto,
  RequestMessagesDto,
  ResponseMessagesDto,
} from '@/Message/Dtos'
import { UserService } from '@/User/user.service'
import { MessageGroupDto } from '@/MessageGroup/Dtos'
import { UserDto } from '@/User/Dtos'
import { UserCredentials } from '@/Types/RequestWithUser'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly _messageRepo: Repository<Message>,
    @Inject(forwardRef(() => MessageGroupService))
    private readonly _messageGroupService: MessageGroupService,
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
  ) {}

  public async createMessage(dto: CreateMessageDto): Promise<MessageDto> {
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

  public async getAll(
    user: UserCredentials,
    dto: RequestMessagesDto,
  ): Promise<ResponseMessagesDto> {
    const { groupId, skip, limit } = dto

    if (!(await this._messageGroupService.containsUser(groupId, user.userId))) {
      throw new BadRequestException('group does not include user')
    }

    const [items, count] = await this._messageRepo.findAndCount({
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
        fileNames: true,
        type: true,
      },
    })

    return {
      count,
      items: items.map((item) => plainToInstance(MessageDto, item)),
    }
  }
}
