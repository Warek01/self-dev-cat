import { Column, Entity, ManyToOne } from 'typeorm'

import { Base } from '@/Entities/Helpers'
import { Message } from '@/Entities/Message.entity'

@Entity()
export class File extends Base {
  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 255 })
  extension: string

  @Column({ type: 'int' })
  size: number

  @Column({ type: 'bytea' })
  bytes: number[]

  @ManyToOne(() => Message)
  message: Message
}
