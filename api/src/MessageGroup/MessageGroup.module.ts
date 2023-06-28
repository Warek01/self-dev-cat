import { Module } from '@nestjs/common';

import { MessageGroupController } from './MessageGroup.controller';
import { MessageGroupService } from './MessageGroup.service';

@Module({
  providers: [MessageGroupService],
  controllers: [MessageGroupController]
})
export class MessageGroupModule {}
