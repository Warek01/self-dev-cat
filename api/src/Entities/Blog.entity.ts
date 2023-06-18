import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'

import { User, BlogCategory } from './index'
import { Base } from './Helpers'

@Entity()
export class Blog extends Base {
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

  @Column({ type: 'varchar', nullable: false })
  slug: string
}
