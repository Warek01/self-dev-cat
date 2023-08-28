import {
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Message, Attachment } from '@/Entities'
import { UploadFilesFromMessageDto } from '@/Attachment/Dtos'
import { MessageGroupService } from '@/MessageGroup/MessageGroup.service'
import { OperationResponseDto } from '@/Dtos'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment) private _fileRepo: Repository<Attachment>,
    @InjectRepository(Message) private _messageRepo: Repository<Message>,
    private readonly _messageGroupService: MessageGroupService,
  ) {}

  public async save(
    files: Array<Express.Multer.File>,
    body: UploadFilesFromMessageDto,
  ): Promise<OperationResponseDto> {
    files.forEach((file) => {
      !(async () => {
        const entity = this._fileRepo.create()
        entity.name = file.originalname
        entity.originalSize = file.size
        entity.mime = file.mimetype

        // entity.buffer = ('\\x' + buffer.toString('hex')) as any
        entity.buffer = file.buffer
        entity.size = file.buffer.length

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

    return plainToInstance(OperationResponseDto, {
      message: 'success',
    } as OperationResponseDto)
  }

  public async streamFile(
    fileId: string,
    userId: string,
  ): Promise<StreamableFile> {
    const fileEntity = await this._fileRepo.findOne({
      where: { id: fileId },
      relations: {
        message: {
          group: true,
        },
      },
    })

    if (!fileEntity) {
      throw new NotFoundException(`file ${fileId} not found`)
    }

    if (
      !(await this._messageGroupService.containsUser(
        fileEntity.message.group.id,
        userId,
      ))
    ) {
      throw new UnauthorizedException(
        `user ${userId} does not have rights to read file ${fileId}`,
      )
    }

    return new StreamableFile(fileEntity.buffer, {
      disposition: `attachment; filename="${fileEntity.name}"`,
      type: fileEntity.mime,
    })
  }
}
