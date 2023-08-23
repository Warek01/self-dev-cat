import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FileService } from '@/File/File.service'
import { FileController } from '@/File/File.controller'
import { Message, File } from '@/Entities'

@Module({
  imports: [TypeOrmModule.forFeature([File, Message])],
  controllers: [FileController],
  exports: [FileService],
  providers: [FileService],
})
export class FileModule {}
