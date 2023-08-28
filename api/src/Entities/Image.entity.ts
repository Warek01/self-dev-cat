import {
  Column,
  CreateDateColumn,
  Entity, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ImageType } from '@/Image/Enums/ImageType.enum'
import {User} from "@/Entities/User.entity";

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int', nullable: false })
  originalWidth: number

  @Column({ type: 'int', nullable: false })
  originalHeight: number

  @Column({ type: 'int', nullable: false })
  width: number

  @Column({ type: 'int', nullable: false })
  height: number

  @Column({ type: 'int', nullable: false })
  originalSize: number

  @Column({ type: 'int', nullable: false })
  size: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  extension: string

  @Column({ type: 'bytea', nullable: false })
  buffer: Buffer

  @Column({
    enum: ImageType,
    type: 'enum',
    default: ImageType.SIMPLE,
    nullable: false,
  })
  type: ImageType

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
