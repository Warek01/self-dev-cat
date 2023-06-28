import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'

import { UsefulResource, FriendRequest } from './index'
import { Base } from './Helpers'

@Entity()
export class User extends Base {
  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ type: 'varchar', nullable: true })
  realName?: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string

  @Column({ type: 'varchar', nullable: true })
  avatarFileName?: string

  @OneToMany(() => UsefulResource, (usefulResource) => usefulResource.user, {
    nullable: true,
  })
  usefulResources: UsefulResource[]

  @OneToMany(() => FriendRequest, (req) => req.from, { nullable: true })
  friendRequests: FriendRequest[]

  @ManyToMany(() => User, (user) => user.friends, { onDelete: 'CASCADE' })
  @JoinTable()
  friends: User[]

  @ManyToMany(() => MessageGroup, (messageGroup) => messageGroup.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  messageGroups: MessageGroup[]
}
