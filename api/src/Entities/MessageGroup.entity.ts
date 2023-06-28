import { User } from '@/Entities/User.entity'
import { Entity, ManyToMany, OneToMany } from 'typeorm'

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
}
