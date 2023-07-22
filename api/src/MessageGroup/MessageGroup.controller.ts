import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import {
  MessageGroupDto,
  RequestMessageGroupsDto,
  ResponseMessageGroupsDto,
} from '@/MessageGroup/Dtos'
import { RequestWithUser } from '@/Types/RequestWithUser'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'
import { RequestCreateGroupDto } from './Dtos/RequestCreateGroup.dto'

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

  @Post()
  @UseGuards(BearerAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  createGroup(@Body() dto: RequestCreateGroupDto): Promise<MessageGroupDto> {
    return this._messageGroupService.createGroup(dto)
  }
}
