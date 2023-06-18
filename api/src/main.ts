import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Self Development Catalog API')
    .setVersion('0.0.1')
    .addBearerAuth()
    .addBasicAuth()
    .build()

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['log', 'error']
        : ['verbose', 'debug', 'log', 'error', 'warn'],
    bodyParser: true,
  })

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)

  await app.listen(process.env.PORT || 3000)
}

bootstrap()
