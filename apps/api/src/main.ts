import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from 'nestjs-pino'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const configService = app.get(ConfigService)

  // Use Pino Logger
  app.useLogger(app.get(Logger))
  const logger = app.get(Logger)

  // Helmet - Security HTTP Headers
  app.use(helmet())
  logger.log('Helmet security enabled')

  // CORS Configuration
  const corsOrigin = configService.get<string>('cors.origin')
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  })
  logger.log(`CORS enabled for origin: ${corsOrigin}`)

  // Global Prefix
  const apiPrefix = configService.get<string>('api.prefix') || 'api'
  app.setGlobalPrefix(apiPrefix)

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter())

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties
      transform: true, // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Auto-convert types
      },
    }),
  )

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('ROI Calculator API')
    .setDescription('API for calculating serverless ROI')
    .setVersion('1.0')
    .addTag('calculations')
    .addTag('health')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  logger.log('Swagger documentation available at /api/docs')

  // Start Server
  const port = configService.get<number>('port') || 3000
  await app.listen(port)
  logger.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`)
  logger.log(`📚 Swagger docs: http://localhost:${port}/api/docs`)
}

bootstrap()
