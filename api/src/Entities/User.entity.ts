import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { MessageGroup } from '@/Entities/MessageGroup.entity'
import { UserRole } from '@/User/Enums/UserRole'
import { UsefulResource, FriendRequest, Image } from './index'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ type: 'varchar', nullable: true })
  realName?: string

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string

  @OneToOne(() => Image, { nullable: true })
  avatar?: Image

  @OneToMany(() => UsefulResource, (usefulResource) => usefulResource.user)
  usefulResources: UsefulResource[]

  @OneToMany(() => FriendRequest, (req) => req.from)
  friendRequests: FriendRequest[]

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  friends: User[]

  @ManyToMany(() => MessageGroup, (messageGroup) => messageGroup.users)
  @JoinTable()
  messageGroups: MessageGroup[]

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEFAULT,
    nullable: false,
  })
  role: UserRole

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
