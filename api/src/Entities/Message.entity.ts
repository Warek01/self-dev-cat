import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { User } from '@/Entities/User.entity'
import { Attachment } from '@/Entities/Attachment.entity'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: true })
  content?: string

  @ManyToOne(() => User)
  @JoinTable()
  user: User

  @ManyToOne(() => MessageGroup, (messageGroup) => messageGroup.messages, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  @Index('idx_messages_message_groups')
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
