import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

import { FriendRequestModule } from '@/FriendRequest/FriendRequest.module'
import { MessageGroupModule } from '@/MessageGroup/MessageGroup.module'
import { UsefulResourcesModule } from '@/UsefulResources/usefulResources.module'
import { AppController } from './app.controller'
import { UserModule } from '@/User/user.module'
import { EncryptionModule } from '@/Encryption/encryption.module'
import { AuthModule } from '@/Auth/auth.module'
import { BlogModule } from '@/Blog/blog.module'
import { MessageModule } from '@/Message/message.module'
import config from '@/Config/Debug'
import { ChatModule } from '@/Chat/chat.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('db.type'),
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        database: configService.get<string>('db.name'),
        username: configService.get<string>('db.user'),
        password: configService.get<string>('db.password'),
        synchronize: configService.get<boolean>('db.synchronize'),
        schema: configService.get<string>('db.schema'),
        entities: configService.get<any[]>('db.entities'),
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    AuthModule,
    UserModule,
    EncryptionModule,
    BlogModule,
    UsefulResourcesModule,
    FriendRequestModule,
    MessageModule,
    MessageGroupModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
