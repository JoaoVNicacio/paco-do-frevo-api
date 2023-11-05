import { Injectable } from '@nestjs/common';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import EventMapper from 'src/application/mappers/event.mapper';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import IEventService from 'src/domain/services/ievent.service';
import EventRepository from 'src/infra/repositories/event.repository';

@Injectable()
class EventService implements IEventService {
  constructor(
    private readonly _eventRepository: EventRepository,
    private readonly _eventMapper: EventMapper,
  ) {}

  public async createEvent(eventDto: EventDTO): Promise<Event> {
    const event = this._eventMapper.dtoToEntity(eventDto);

    return this._eventRepository.createEvent(event);
  }

  public async findById(id: string): Promise<Event> {
    return this._eventRepository.findById(id);
  }

  public async updateEvent(id: string, eventDto: EventDTO): Promise<Event> {
    const event = this._eventMapper.dtoToEntity(eventDto);

    return this._eventRepository.updateEvent(id, event);
  }

  public async deleteEvent(id: string): Promise<void> {
    return await this._eventRepository.deleteEvent(id);
  }
}

export default EventService;
