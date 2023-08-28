import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'

import { BearerAuthGuard } from '@/Auth/Guard/BearerAuth.guard'
import { ImageService } from './Image.service'
import {OperationResponseDto} from "@/Dtos";

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly _imageService: ImageService) {}

  @ApiOperation({ description: 'Post image' })
  // @ApiBearerAuth()
  // @UseGuards(BearerAuthGuard)
  @Post('post-image')
  @ApiOkResponse()
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  post(@UploadedFile('file') file: Express.Multer.File): Promise<OperationResponseDto> {
    return this._imageService.saveImage(file)
  }
}
