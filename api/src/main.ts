import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

import { AppModule } from './app.module'
import { EnvService } from '@/env/env.service'

async function bootstrap(): Promise<void> {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Self Development Catalog API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .addBasicAuth()
    .build()

  const app: INestApplication = await NestFactory.create(AppModule)
  const env: EnvService = app.get(EnvService)

  app.enableCors()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)

  await app.listen(env.port)
}

bootstrap()
