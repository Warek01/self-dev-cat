import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AttachmentService } from '@/Attachment/Attachment.service'
import { AttachmentController } from '@/Attachment/Attachment.controller'
import { Message, Attachment, MessageGroup, User } from '@/Entities'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'

@Module({
  imports: [TypeOrmModule.forFeature([Attachment, Message, MessageGroup, User])],
  controllers: [AttachmentController],
  exports: [AttachmentService],
  providers: [AttachmentService, MessageGroupService],
})
export class AttachmentModule {}
