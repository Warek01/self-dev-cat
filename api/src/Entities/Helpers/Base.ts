import { Index, PrimaryGeneratedColumn } from 'typeorm'

import { DateAudit } from './DateAudit'

export abstract class Base extends DateAudit {
  @Index()
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number
}
