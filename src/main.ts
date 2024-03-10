import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { AppModule } from './infra/modules/app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import GeneralExceptionsFilter from './infra/exceptionsFilters/general-exception.filter';
import injectProfiles from './application/mapping/profiles/profilesInjector/profiles.injector';

dotenv.config();

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new ConsoleLogger());
  app.useGlobalFilters(new GeneralExceptionsFilter(new ConsoleLogger()));

  const config = new DocumentBuilder()
    .setTitle('Paço do Frevo - API')
    .setDescription(apiDescription)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  injectProfiles();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();

const apiDescription = `Our software is like a trusted friend for frevo,
the heartbeat of Pernambuco's culture and an intangible heritage of humanity.
It's here to preserve all the magic of frevo, from its colorful history to
the vibrant community that keeps it alive and kicking.`;
