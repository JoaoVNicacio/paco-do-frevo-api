import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import EventController from '../controllers/event.controller';
import EventService from 'src/application/useCases/services/event.service';
import EventRepository from '../repositories/event.repository';
import EventMapper from 'src/application/mappers/event.mapper';
import AssociationRepository from '../repositories/association.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Association])],
  controllers: [EventController],
  providers: [
    EventService,
    EventRepository,
    EventMapper,
    AssociationRepository,
  ],
})
export class EventModule {}
