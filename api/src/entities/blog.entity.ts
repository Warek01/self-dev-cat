import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from './user.entity'
import { BlogCategory } from './blog-category.entity'

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  content: string

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  references?: {
    href: string
    text: string
  }[]

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: false })
  user: User

  @ManyToMany(() => BlogCategory, (category) => category.blogs, {
    onDelete: 'SET NULL',
  })
  @JoinTable()
  categories: BlogCategory[]

  @Index('idx_blogs_slug')
  @Column({ type: 'varchar', nullable: false, unique: true })
  slug: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
