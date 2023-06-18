import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
} from '@nestjs/common'

import { BlogService } from './blog.service'

@Controller('blog')
export class BlogController {
  constructor(private _blogService: BlogService) {}

  @Get('get/:blogId')
  @HttpCode(HttpStatus.OK)
  async getPost(@Param('blogId') id: number): Promise<void> {
    throw new NotImplementedException()
  }

  @Get('belongs-to/:userId')
  @HttpCode(HttpStatus.OK)
  async belongsTo(@Param('userId') id: number): Promise<void> {
    throw new NotImplementedException()
  }

  @Delete('delete/:blogId')
  @HttpCode(HttpStatus.OK)
  async deleteBlog(@Param('blogId') id: number): Promise<void> {
    throw new NotImplementedException()
  }
}
