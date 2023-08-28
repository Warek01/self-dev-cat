import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import Sharp from 'sharp'

import { OperationResponseDto } from '@/Dtos'

@Injectable()
export class ImageService {
  constructor() {}

  public async saveImage(
    file: Express.Multer.File,
  ): Promise<OperationResponseDto> {
    const newBuffer = await Sharp(file.buffer)
      .withMetadata()
      .resize({
        fit: Sharp.fit.cover,
        withoutEnlargement: true,
        withoutReduction: false,
        height: 1080,
      })
      .toFormat(Sharp.format.webp)
      .toBuffer()

    return plainToInstance(OperationResponseDto, {
      message: 'success',
    } as OperationResponseDto)
  }
}
