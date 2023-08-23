import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm'

import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { User } from '@/Entities/User.entity'
import { MessageType } from '@/Message/Enums/MessageType.enum'
import { Base } from './Helpers'
import { File } from '@/Entities/File.entity'

@Entity()
export class Message extends Base {
  @Column({ type: 'varchar', nullable: true })
  content?: string

  @Column({ type: 'varchar', array: true, nullable: true })
  fileNames?: string[]

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

  @OneToMany(() => File, (file) => file.message)
  attachments: File[]
}
