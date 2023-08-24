import { Column, Entity, ManyToOne } from 'typeorm'

import { Base } from '@/Entities/Helpers'
import { Message } from '@/Entities/Message.entity'

@Entity()
export class File extends Base {
  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'int' })
  size: number

  @Column({ type: 'varchar', length: 255 })
  mime: string

  @Column({ type: 'bytea' })
  buffer: Buffer

  @ManyToOne(() => Message)
  message: Message
}
