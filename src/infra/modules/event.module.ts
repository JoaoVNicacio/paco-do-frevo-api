import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import EventController from '../controllers/event.controller';
import EventService from 'src/application/useCases/services/event.service';
import EventRepository from '../repositories/event.repository';
import AssociationRepository from '../repositories/association.repository';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IEventService from 'src/domain/services/ievent.service';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import mapper from 'src/application/mappers/mapper';

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
      provide: 'IMapper',
      useValue: mapper,
    },
  ],
})
export class EventModule {}
