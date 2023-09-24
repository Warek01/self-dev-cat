import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
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

import { JwtAuthGuard } from '@/auth/jwt.guard'
import type { RequestWithUser } from '@/types/request-with-user'

import { MessageGroupService } from './message-group.service'
import { RequestCreateGroupDto } from './dto/request-create-group.dto'
import { RequestMessageGroupsDto } from './dto/request-message-groups.dto'
import { ResponseMessageGroupsDto } from './dto/response-message-groups.dto'
import { MessageGroupDto } from './dto/message-group.dto'

@ApiTags('Message Group')
@Controller('message-group')
export class MessageGroupController {
  constructor(private readonly _messageGroupService: MessageGroupService) {}

  @ApiOperation({
    description: 'Get all groups of a user',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('all')
  getAll(
    @Req() req: RequestWithUser,
    @Query() filter: RequestMessageGroupsDto,
  ): Promise<ResponseMessageGroupsDto> {
    return this._messageGroupService.getAll(req.user, filter)
  }

  @ApiOperation({ description: 'Get information about group' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MessageGroupDto> {
    return this._messageGroupService.find(req.user, id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  createGroup(@Body() dto: RequestCreateGroupDto): Promise<MessageGroupDto> {
    return this._messageGroupService.createGroup(dto)
  }
}
