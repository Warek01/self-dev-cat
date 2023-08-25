import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { FriendRequestStatus } from '@/FriendRequest/enums/FriendRequestStatus'
import { User } from './index'

@Entity('friend_requests')
export class FriendRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string

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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
