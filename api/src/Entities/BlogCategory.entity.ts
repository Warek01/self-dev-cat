import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

import { Blog } from './index'

@Entity('blog_categories')
export class BlogCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  slug: string

  @Column({ type: 'varchar', nullable: false })
  title: string

  @ManyToMany(() => Blog, (blog) => blog.categories)
  blogs: Blog[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
