import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '@/auth/jwt.guard'
import type { RequestWithUser } from '@/types/request-with-user'

import { ResponseMessagesDto } from './dto/response-messages.dto'
import { RequestMessagesDto } from './dto/request-messages.dto'
import { MessageDto } from './dto/message.dto'
import { MessageService } from './message.service'

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAll(
    @Req() req: RequestWithUser,
    @Query() filter: RequestMessagesDto,
  ): Promise<ResponseMessagesDto> {
    return this.messageService.getAll(req.user, filter)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<MessageDto> {
    return this.messageService.getMessageOrThrow(id)
  }
}
