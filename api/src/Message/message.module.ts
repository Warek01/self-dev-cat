import { Module } from '@nestjs/common'

import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { MessageGroupModule } from '@/MessageGroup/MessageGroup.module'
import { UserModule } from '@/User/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Message } from '@/Entities'

@Module({
  imports: [
    MessageGroupModule,
    UserModule,
    TypeOrmModule.forFeature([Message]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
