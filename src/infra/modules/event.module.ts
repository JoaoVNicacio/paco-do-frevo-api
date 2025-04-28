import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventService from 'src/application/services/event.service';
import EventRepository from '../repositories/event.repository';
import AssociationRepository from '../repositories/association.repository';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManager } from '@nestjs/cache-manager';
import IEventService from 'src/application/contracts/services/ievent.service';
import mapper from 'src/application/mapping/mapper';
import EventController from 'src/api/controllers/event.controller';
import AssociationDBSchema from '../schemas/associationAggregate/association.schema';
import EventDBSchema from '../schemas/associationAggregate/event.schema';

@Module({
  imports: [TypeOrmModule.forFeature([EventDBSchema, AssociationDBSchema])],
  controllers: [EventController],
  providers: [
    // Services:
    {
      provide: IEventService,
      useClass: EventService,
    },

    // Repositories:
    {
      provide: IEventRepository,
      useClass: EventRepository,
    },
    {
      provide: IAssociationRepository,
      useClass: AssociationRepository,
    },

    // Mappers:
    {
      provide: Mapper,
      useValue: mapper,
    },

    // CacheManager:
    {
      provide: CacheManager,
      useExisting: cacheManager,
    },

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
    },
  ],
})
export class EventModule {}
