import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'

import { JwtAuthGuard } from '@/auth/jwt.guard'
import { ActionResponseDto } from '@/dto/action-response.dto'

import { ImageService } from './image.service'

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // @ApiBearerAuth()
  // @UseGuards(BearerAuthGuard)
  @Post('post-image')
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
  @ApiQuery({
    type: Boolean,
    name: 'asIcon',
  })
  @UseInterceptors(FileInterceptor('file'))
  post(
    @UploadedFile('file') file: Express.Multer.File,
    @Query('asIcon', ParseBoolPipe) asIcon: boolean = false,
  ): Promise<ActionResponseDto> {
    return this.imageService.saveImage(file, asIcon)
  }

  @Get('get/:imageId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getFile(
    @Param('imageId', ParseUUIDPipe) imageId: string,
  ): Promise<StreamableFile> {
    return this.imageService.streamFile(imageId)
  }
}
