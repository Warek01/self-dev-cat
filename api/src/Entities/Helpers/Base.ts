import { PrimaryGeneratedColumn } from 'typeorm'

import { DateAudit } from './DateAudit'

export abstract class Base extends DateAudit {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number
}
