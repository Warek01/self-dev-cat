import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'

import { UsefulResource, FriendRequest } from './index'
import { Base } from './Helpers'

@Entity()
export class User extends Base {
  @Column({ type: 'varchar', nullable: false })
  username: string

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ type: 'varchar', nullable: true })
  realName?: string

  @Column({ type: 'varchar', nullable: false })
  email: string

  @OneToMany(() => UsefulResource, (usefulResource) => usefulResource.user, {
    nullable: true,
  })
  usefulResources: UsefulResource[]

  @OneToMany(() => FriendRequest, (req) => req.from, { nullable: true })
  friendRequests: FriendRequest[]

  @ManyToMany(() => User, (user) => user.friends, { nullable: true })
  friends: User[]
}
