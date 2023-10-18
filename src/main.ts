import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { AppModule } from './infra/modules/app.module';

dotenv.config();

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  await app.listen(3000);
}

bootstrap();
