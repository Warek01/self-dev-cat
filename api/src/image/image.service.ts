import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import Sharp from 'sharp'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Image } from '@/entities/image.entity'
import { ActionResponseDto } from '@/dto/action-response.dto'

import { ImageType } from './enums/image-type.enum'

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private readonly imageRepo: Repository<Image>,
  ) {}

  public async saveImage(
    file: Express.Multer.File,
    asIcon: boolean,
  ): Promise<ActionResponseDto> {
    const sharpImage = Sharp(file.buffer)

    const formattedImage = await sharpImage
      .resize({
        fit: Sharp.fit.cover,
        withoutEnlargement: true,
        withoutReduction: asIcon,
        height: asIcon ? 64 : 1080,
        width: asIcon ? 64 : undefined,
      })
      .toFormat(Sharp.format.webp)
      .toBuffer({ resolveWithObject: true })

    const oldMetadata = await sharpImage.metadata()

    const image = this.imageRepo.create()

    Object.assign(image, {
      originalHeight: oldMetadata.height!,
      originalWidth: oldMetadata.width!,
      originalSize: oldMetadata.size!,
      height: formattedImage.info.height!,
      width: formattedImage.info.width!,
      size: formattedImage.info.size!,
      name: file.originalname,
      extension: file.mimetype.split('/')[1],
      type: asIcon ? ImageType.ICON : ImageType.SIMPLE,
      buffer: formattedImage.data,
    } as Partial<Image>)

    await this.imageRepo.save(image)

    return plainToInstance(ActionResponseDto, {
      message: 'success',
    } as ActionResponseDto)
  }

  public async streamFile(imageId: string): Promise<StreamableFile> {
    const image = await this.imageRepo.findOne({
      where: { id: imageId },
    })

    if (!image) {
      throw new NotFoundException(`file ${imageId} not found`)
    }

    return new StreamableFile(image.buffer, {
      disposition: `attachment; filename="${image.name}"`,
      type: `image/${image.extension}`,
    })
  }
}
