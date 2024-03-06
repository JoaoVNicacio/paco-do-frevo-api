import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { AppModule } from './infra/modules/app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import injectProfiles from './application/profiles/profilesInjector/profiles.injector';
import GeneralExceptionsFilter from './infra/exceptionsFilters/general-exception.filter';

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
    .setDescription(
      'API de cadastro de associações e outros fazedores que fazem o frevo, um patrimônio imaterial da humanidade, acontecer.',
    )
    .setVersion('1.0')
    .build();

  injectProfiles();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
