import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './index'
import { Base } from './Helpers';

@Entity()
export class FriendRequest extends Base {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  from: User

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  to: User

  @Column({ type: 'varchar', default: 'pending', nullable: false })
  status: 'accepted' | 'rejected' | 'pending'
}
