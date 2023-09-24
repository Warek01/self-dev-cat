import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MessageGroupService } from '@/message-group/message-group.service'
import { Attachment } from '@/entities/attachment.entity'
import { Message } from '@/entities/message.entity'
import { MessageGroup } from '@/entities/message-group.entity'
import { User } from '@/entities/user.entity'

import { AttachmentService } from './attachment.service'
import { AttachmentController } from './attachment.controller'

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment, Message, MessageGroup, User]),
  ],
  controllers: [AttachmentController],
  exports: [AttachmentService],
  providers: [AttachmentService, MessageGroupService],
})
export class AttachmentModule {}
