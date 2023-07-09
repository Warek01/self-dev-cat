import { User } from '@/Entities/User.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { Message } from '@/Entities/Message.entity'
import { Base } from '@/Entities/Helpers'

@Entity()
export class MessageGroup extends Base {
  @OneToMany(() => Message, (message) => message.group)
  messages: Message[]

  @ManyToMany(() => User, (user) => user.messageGroups, {
    onDelete: 'CASCADE',
  })
  users: User[]

  @ManyToOne(() => User)
  @JoinTable()
  rootUser: User

  @Column({ type: 'varchar', length: 50, nullable: true })
  name?: string
}
