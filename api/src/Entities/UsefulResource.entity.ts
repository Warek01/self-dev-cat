import {
  Entity,
  Column,
  ManyToOne,
} from 'typeorm'

import { User } from './index'
import { Base } from './Helpers'

@Entity()
export class UsefulResource extends Base {
  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'varchar', nullable: false })
  description: string

  @ManyToOne(() => User, (user) => user.usefulResources, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User
}
