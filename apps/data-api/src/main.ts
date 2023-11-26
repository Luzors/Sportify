/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppModule } from './app/app.module';
import { ApiResponseInterceptor } from '@sportify-nx/backend/dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {};
  app.enableCors(corsOptions);

  app.useGlobalInterceptors(new ApiResponseInterceptor());

  const port = process.env.PORT || 8080;
  await app.listen(port);
  Logger.log(
    `🚀 Data-api is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
