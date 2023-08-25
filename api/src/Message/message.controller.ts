import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { ResponseMessagesDto, RequestMessagesDto, MessageDto } from './Dtos'
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

  @ApiOperation({ description: 'get message' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: MessageDto })
  @ApiUnauthorizedResponse()
  @UseGuards(BearerAuthGuard)
  @Get('get/:id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseUUIDPipe) id: string): Promise<MessageDto> {
    return this._messageService.getMessageOrThrow(id)
  }
}
