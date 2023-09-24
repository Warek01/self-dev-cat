import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Message } from './message.entity'

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'int' })
  originalSize: number

  @Column({ type: 'int' })
  size: number

  @Column({ type: 'varchar', length: 255 })
  mime: string

  @Column({ type: 'bytea' })
  buffer: Buffer

  @ManyToOne(() => Message, (message) => message.attachments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  message: Message

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
