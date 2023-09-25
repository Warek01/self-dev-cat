import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MessageGroupService } from '@/message-group/message-group.service'
import { Attachment } from '@/entities/attachment.entity'
import { Message } from '@/entities/message.entity'
import { MessageGroup } from '@/entities/message-group.entity'
import { User } from '@/entities/user.entity'
import { UserModule } from '@/user/user.module'

import { AttachmentService } from './attachment.service'
import { AttachmentController } from './attachment.controller'

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Attachment, Message, MessageGroup, User]),
  ],
  controllers: [AttachmentController],
  exports: [AttachmentService],
  providers: [AttachmentService, MessageGroupService],
})
export class AttachmentModule {}
