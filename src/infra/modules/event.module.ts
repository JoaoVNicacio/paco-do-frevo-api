import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import Event from 'src/domain/entities/associationAggregate/event.entity';
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
import { CACHE_MANAGER as cacheManger } from '@nestjs/cache-manager';
import IEventService from 'src/application/contracts/services/ievent.service';
import mapper from 'src/application/mapping/mapper';
import EventController from 'src/api/controllers/event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Association])],
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
      useValue: cacheManger,
    },

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
    },
  ],
})
export class EventModule {}
