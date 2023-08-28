import {Global, Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ImageController } from '@/Image/Image.controller'
import { Image } from '@/Entities'
import { ImageService } from '@/Image/Image.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [],
})
export class ImageModule {}
