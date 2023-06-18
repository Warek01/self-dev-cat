import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsefulResourcesModule } from '@/UsefulResources/usefulResources.module'
import { AppController } from './app.controller'
import { UserModule } from '@/User/user.module'
import { EncryptionModule } from '@/Encryption/encryption.module'
import { LogModule } from '@/Log/log.module'
import { AuthModule } from '@/Auth/auth.module'
import { BlogModule } from '@/Blog/blog.module'
import { FriendRequestModule } from './friend-request/friend-request.module'
import config from '@/Config/Debug'

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
        entities: configService.get<any[]>('db.entities')
      }),
    }),
    LogModule,
    UserModule,
    EncryptionModule,
    AuthModule,
    BlogModule,
    UsefulResourcesModule,
    FriendRequestModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
