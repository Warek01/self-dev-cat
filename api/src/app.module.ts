import { Module, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { APP_PIPE } from '@nestjs/core'
import 'multer'

import { FriendRequestModule } from '@/friend-request/friend-request.module'
import { MessageGroupModule } from '@/message-group/message-group.module'
import { UsefulResourceModule } from '@/useful-resource/useful-resource.module'
import { UserModule } from '@/user/user.module'
import { AuthModule } from '@/auth/auth.module'
import { BlogModule } from '@/blog/blog.module'
import { MessageModule } from '@/message/message.module'
import { ChatModule } from '@/chat/chat.module'
import { AttachmentModule } from '@/attachment/attachment.module'
import { ImageModule } from '@/image/image.module'
import { EnvModule } from '@/env/env.module'
import { EnvService } from '@/env/env.service'

import { AppController } from './app.controller'

@Module({
  imports: [
    EnvModule,
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        type: env.db.type,
        host: env.db.host,
        port: env.db.port,
        database: env.db.name,
        username: env.db.user,
        password: env.db.password,
        synchronize: env.isDev,
        schema: env.db.schema,
        entities: ['**/*.entity.js'],
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    AuthModule,
    UserModule,
    BlogModule,
    UsefulResourceModule,
    FriendRequestModule,
    MessageModule,
    MessageGroupModule,
    ChatModule,
    AttachmentModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
