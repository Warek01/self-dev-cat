import { Injectable } from '@nestjs/common'
import { number, object, string } from 'yup'

@Injectable()
export class BlogService {
  private static _blogSchema = object({
    slug: string().required().min(2).max(255).lowercase().matches(/^\//),
    content: string().required().min(1),
    userId: number().required().min(0),
    links: string()
      .notRequired()
      .test('is-json', 'Invalid JSON format', async (value) => {
        try {
          if (typeof value !== 'string') {
            return true
          }

          JSON.parse(value)
          return true
        } catch {
          return false
        }
      }),
  })

  public async create(): Promise<void> {}
}
