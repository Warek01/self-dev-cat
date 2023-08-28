import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'

import { AttachmentService } from '@/Attachment/Attachment.service'
import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { UploadFilesFromMessageDto } from '@/Attachment/Dtos'
import { RequestWithUser } from '@/Types/RequestWithUser'
import {OperationResponseDto} from "@/Dtos";

@ApiTags('Attachments')
@Controller('attachment')
export class AttachmentController {
  constructor(private _fileService: AttachmentService) {}

  @Post('from-message')
  @ApiOperation({
    description: 'Post an attachment',
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        messageId: {
          type: 'number',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  postFromMessage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UploadFilesFromMessageDto,
  ): Promise<OperationResponseDto> {
    return this._fileService.save(files, body)
  }

  @Get('get/:id')
  @ApiOperation({
    description: 'Get an attachment from a message',
  })
  @HttpCode(HttpStatus.OK)
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  getFile(
    @Param('id', ParseUUIDPipe) fileId: string,
    @Req() req: RequestWithUser,
  ): Promise<StreamableFile> {
    return this._fileService.streamFile(fileId, req.user.userId)
  }
}
