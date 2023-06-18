import { Column, Entity, OneToOne } from 'typeorm'

import { User } from './index'
import { Base } from './Helpers'

@Entity()
export class Log extends Base {
  @Column({ type: 'varchar', nullable: false })
  type: string

  @OneToOne(() => User, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user?: User

  @Column({ type: 'varchar', nullable: true })
  username?: string

  @Column({ type: 'varchar', nullable: true })
  description?: string

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date
}
