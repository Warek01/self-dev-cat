import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'

import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { UserRole } from '@/User/enums/UserRole'
import { UsefulResource, FriendRequest } from './index'
import { Base } from './Helpers'

@Entity({ name: 'users' })
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

  @OneToMany(() => UsefulResource, (usefulResource) => usefulResource.user)
  usefulResources: UsefulResource[]

  @OneToMany(() => FriendRequest, (req) => req.from)
  friendRequests: FriendRequest[]

  @ManyToMany(() => User, (user) => user.friends, { onDelete: 'CASCADE' })
  @JoinTable()
  friends: User[]

  @ManyToMany(() => MessageGroup, (messageGroup) => messageGroup.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  messageGroups: MessageGroup[]

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEFAULT,
    nullable: false,
  })
  role: UserRole
}
