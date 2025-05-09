import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './infra/modules/app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import GeneralExceptionsFilter from './infra/exceptionsFilters/general-exception.filter';
import injectProfiles from './application/mapping/profiles/profilesInjector/profiles.injector';
import GlobalRouteAccessLoggingInterceptor from './api/interceptors/global-route-acess-logging.interceptor';

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(new ConsoleLogger());

  app.useGlobalFilters(new GeneralExceptionsFilter(new ConsoleLogger()));

  app.useGlobalInterceptors(
    new GlobalRouteAccessLoggingInterceptor(new ConsoleLogger()),
  );

  injectProfiles();

  const config = new DocumentBuilder()
    .setTitle('Paço do Frevo - API')
    .setDescription(API_DESCRIPTION)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();

const API_DESCRIPTION = `Our software is like a trusted friend for frevo,
the heartbeat of Pernambuco's culture and an intangible heritage of humanity.
It's here to preserve all the magic of frevo, from its colorful history to
the vibrant community that keeps it alive and kicking.`;
