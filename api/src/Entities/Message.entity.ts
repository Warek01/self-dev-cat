import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'

import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { User } from '@/Entities/User.entity'
import { MessageType } from '@/Message/Enums/MessageType.enum'
import { Base } from './Helpers'
import { Attachment } from '@/Entities/Attachment.entity'

@Entity()
export class Message extends Base {
  @Column({ type: 'varchar', nullable: true })
  content?: string

  @Column({ type: 'enum', enum: MessageType, default: MessageType.DEFAULT })
  type: MessageType

  @ManyToOne(() => User)
  @JoinTable()
  user: User

  @ManyToOne(() => MessageGroup, (messageGroup) => messageGroup.messages, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  group: MessageGroup

  @ManyToOne(() => Message, (message) => message.replies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinTable()
  repliesTo?: Message

  @OneToMany(() => Message, (message) => message.repliesTo)
  replies: Message[]

  @OneToMany(() => Attachment, (file) => file.message)
  attachments: Attachment[]
}
