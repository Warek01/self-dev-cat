import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { ResponseMessagesDto, RequestMessagesDto } from './Dtos'
import { MessageService } from './message.service'
import { RequestWithUser } from '@/Types/RequestWithUser'

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly _messageService: MessageService) {}

  @ApiOperation({
    description: 'Get messages from a group',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseMessagesDto })
  @ApiUnauthorizedResponse()
  @UseGuards(BearerAuthGuard)
  @Get('all')
  getAll(
    @Req() req: RequestWithUser,
    @Query() filter: RequestMessagesDto,
  ): Promise<ResponseMessagesDto> {
    return this._messageService.getAll(req.user, filter)
  }
}
