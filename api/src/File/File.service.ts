import { Injectable, NotFoundException } from '@nestjs/common'
import Sharp from 'sharp'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Message, File } from '@/Entities'
import { UploadFilesFromMessageDto } from '@/File/Dtos'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private _fileRepo: Repository<File>,
    @InjectRepository(Message) private _messageRepo: Repository<Message>,
  ) {}

  public async save(
    files: Array<Express.Multer.File>,
    body: UploadFilesFromMessageDto,
  ): Promise<void> {
    files.forEach((file) => {
      !(async () => {
        const entity = this._fileRepo.create()
        entity.buffer = ('\\x' + file.buffer.toString('hex')) as any
        entity.name = file.originalname
        entity.size = file.size
        entity.mime = file.mimetype

        const message = await this._messageRepo.findOneBy({
          id: body.messageId,
        })

        if (!message) {
          throw new NotFoundException(`message ${body.messageId} not found`)
        }

        entity.message = message

        await this._fileRepo.save(entity)
      })()
    })
  }

  public resize(instance: Sharp.Sharp): Sharp.Sharp {
    return instance.resize({
      fit: 'cover',
      height: 1080,
      width: 1980,
      withoutReduction: false,
      withoutEnlargement: true,
      background: {
        r: 0,
        g: 0,
        b: 0,
        alpha: 0,
      },
      kernel: 'lanczos3',
      position: 'centre',
      fastShrinkOnLoad: true,
    })
  }
}
