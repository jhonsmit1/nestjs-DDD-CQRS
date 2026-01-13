import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './shared/domain/logger/logger';
import { NestLoggerAdapter } from './shared/infrastructure/logger/nest-logger.adapter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(Logger);
  app.useLogger(new NestLoggerAdapter(logger));

  // app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos extras
      forbidNonWhitelisted: true, // error si mandan campos no permitidos
      transform: true, // convierte tipos (string → number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
