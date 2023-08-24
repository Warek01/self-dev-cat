import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from '@/File/File.service'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { FilesInterceptor } from '@nestjs/platform-express'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { UploadFilesFromMessageDto } from '../../dist/src/File/Dtos'

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private _fileService: FileService) {}

  @Post('from-message')
  @ApiOperation({
    description: 'Post a file',
  })
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
  ): Promise<void> {
    return this._fileService.save(files, body)
  }
}
