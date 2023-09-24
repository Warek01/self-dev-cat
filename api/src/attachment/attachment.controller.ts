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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'

import { JwtAuthGuard } from '@/auth/jwt.guard'
import type { RequestWithUser } from '@/types/request-with-user'
import { ActionResponseDto } from '@/dto/action-response.dto'

import { UploadFilesFromMessageDto } from './dto/upload-files-from-message.dto'
import { AttachmentService } from './attachment.service'

@ApiTags('Attachments')
@Controller('attachment')
export class AttachmentController {
  constructor(private attachmentService: AttachmentService) {}

  @Post('from-message')
  @HttpCode(HttpStatus.CREATED)
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  postFromMessage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UploadFilesFromMessageDto,
  ): Promise<ActionResponseDto> {
    return this.attachmentService.save(files, body)
  }

  @Get('get/:fileId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getFile(
    @Param('fileId', ParseUUIDPipe) fileId: string,
    @Req() req: RequestWithUser,
  ): Promise<StreamableFile> {
    return this.attachmentService.streamFile(fileId, req.user.id)
  }
}
