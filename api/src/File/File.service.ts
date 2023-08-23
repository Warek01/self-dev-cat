import { Injectable } from '@nestjs/common'
import Sharp from 'sharp'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Message, File } from '@/Entities'

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private _fileRepo: Repository<File>,
    @InjectRepository(Message) private _messageRepo: Repository<Message>,
  ) {}

  public async save(
    files: Express.Multer.File | Array<Express.Multer.File>,
  ): Promise<void> {
    console.log(files)
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
