import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { EnvService } from './env.service'

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
