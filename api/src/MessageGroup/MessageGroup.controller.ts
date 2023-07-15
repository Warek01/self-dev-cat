import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import {
  MessageGroupDto,
  RequestMessageGroupsDto,
  ResponseMessageGroupsDto,
} from '@/MessageGroup/Dtos'
import { RequestWithUser } from '@/Types/RequestWithUser'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'

@ApiTags('Message Group')
@Controller('message-group')
export class MessageGroupController {
  constructor(private readonly _messageGroupService: MessageGroupService) {}

  @ApiOperation({
    description: 'Get all groups of a user',
  })
  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  @Get('all')
  getAll(
    @Req() req: RequestWithUser,
    @Query() filter: RequestMessageGroupsDto,
  ): Promise<ResponseMessageGroupsDto> {
    return this._messageGroupService.getAll(req.user, filter)
  }

  @ApiOperation({ description: 'Get information about group' })
  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  @Get(':id')
  find(
    @Req() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MessageGroupDto> {
    return this._messageGroupService.find(req.user, id)
  }
}
