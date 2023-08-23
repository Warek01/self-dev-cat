import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileService } from '@/File/File.service'
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger'
import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { FilesInterceptor } from '@nestjs/platform-express'

@Controller('file')
export class FileController {
  constructor(private _fileService: FileService) {}

  @Post()
  @ApiOperation({
    description: 'Post a file',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  post(@UploadedFiles() files: Array<Express.Multer.File>): Promise<void> {
    return this._fileService.save(files)
  }
}
