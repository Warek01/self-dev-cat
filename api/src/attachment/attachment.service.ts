import {
  Injectable,
  NotFoundException,
  StreamableFile,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { MessageGroupService } from '@/message-group/message-group.service'
import { Attachment } from '@/entities/attachment.entity'
import { Message } from '@/entities/message.entity'
import { ActionResponseDto } from '@/dto/action-response.dto'

import { UploadFilesFromMessageDto } from './dto/upload-files-from-message.dto'

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentsRepo: Repository<Attachment>,
    @InjectRepository(Message) private messagesRepo: Repository<Message>,
    private readonly messageGroupService: MessageGroupService,
  ) {}

  public async save(
    files: Array<Express.Multer.File>,
    dto: UploadFilesFromMessageDto,
  ): Promise<ActionResponseDto> {
    for (const file of files) {
      const entity: Attachment = this.attachmentsRepo.create()

      entity.name = file.originalname
      entity.originalSize = file.size
      entity.mime = file.mimetype
      entity.buffer = file.buffer
      entity.size = file.buffer.length

      const message: Message | null = await this.messagesRepo.findOneBy({
        id: dto.messageId,
      })

      if (!message) {
        throw new NotFoundException()
      }

      entity.message = message

      await this.attachmentsRepo.save(entity)
    }

    return plainToInstance(ActionResponseDto, {
      message: 'success',
    } as ActionResponseDto)
  }

  public async streamFile(
    fileId: string,
    userId: string,
  ): Promise<StreamableFile> {
    const fileEntity: Attachment | null = await this.attachmentsRepo.findOne({
      where: { id: fileId },
      relations: {
        message: {
          group: true,
        },
      },
    })

    if (!fileEntity) {
      throw new NotFoundException()
    }

    if (
      !(await this.messageGroupService.containsUser(
        fileEntity.message.group.id,
        userId,
      ))
    ) {
      throw new UnauthorizedException()
    }

    return new StreamableFile(fileEntity.buffer, {
      disposition: `attachment; filename="${fileEntity.name}"`,
      type: fileEntity.mime,
    })
  }
}
