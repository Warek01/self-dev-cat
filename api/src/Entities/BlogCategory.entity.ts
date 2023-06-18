import { Column, Entity, ManyToMany } from 'typeorm'

import { Blog } from './index'
import { Base } from './Helpers'

@Entity()
export class BlogCategory extends Base {
  @Column({ type: 'varchar', nullable: false })
  slug: string

  @Column({ type: 'varchar', nullable: false })
  title: string

  @ManyToMany(() => Blog, (blog) => blog.categories)
  blogs: Blog[]
}
