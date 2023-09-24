import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from './user.entity'
import { Message } from './message.entity'

@Entity('message_groups')
export class MessageGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => Message, (message) => message.group)
  messages: Message[]

  @ManyToMany(() => User, (user) => user.messageGroups)
  users: User[]

  @ManyToOne(() => User)
  @JoinTable()
  rootUser: User

  @Column({ type: 'varchar', length: 50, nullable: true })
  name?: string

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastMessageTimestamp: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
