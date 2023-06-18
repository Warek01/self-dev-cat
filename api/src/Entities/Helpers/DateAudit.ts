import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class DateAudit {
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
