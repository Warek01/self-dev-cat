import { Column, Entity, ManyToOne } from 'typeorm'

import { FriendRequestStatus } from '@/FriendRequest/enums/FriendRequestStatus'
import { Base } from './Helpers'
import { User } from './index'

@Entity()
export class FriendRequest extends Base {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  from: User

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  to: User

  @Column({
    type: 'enum',
    enum: FriendRequestStatus,
    default: FriendRequestStatus.PENDING,
    nullable: false,
  })
  status: FriendRequestStatus
}
