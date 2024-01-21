import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import EventMapper from 'src/application/mappers/event.mapper';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import IEventService from 'src/domain/services/ievent.service';

@Injectable()
class EventService implements IEventService {
  constructor(
    @Inject(IEventRepository)
    private readonly _eventRepository: IEventRepository,

    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,

    private readonly _eventMapper: EventMapper,
  ) {}

  public async createEvent(
    eventDto: EventDTO,
    associationId: string,
  ): Promise<ValidationResponse<Event>> {
    const event = this._eventMapper.dtoToEntity(eventDto);

    const association =
      await this._associationRepository.getById(associationId);

    if (!association) {
      const error = new ValidationError();
      error.constraints = { associationId: 'The association does not exists' };

      return new ValidationResponse(event, [error], false);
    }

    event.association = association;

    const isValid = await event.isValid();

    if (!isValid) {
      return new ValidationResponse(
        event,
        await event.validateCreation(),
        isValid,
      );
    }

    const insertResponse = await this._eventRepository.createEvent(event);

    return new ValidationResponse(
      insertResponse,
      await event.validateCreation(),
      isValid,
    );
  }

  public async findById(id: string): Promise<Event> {
    return this._eventRepository.findById(id);
  }

  public async updateEvent(
    id: string,
    eventDto: EventDTO,
  ): Promise<ValidationResponse<Event>> {
    const event = this._eventMapper.dtoToEntity(eventDto);

    const isValid = await event.isValid();

    if (!isValid) {
      return new ValidationResponse(
        event,
        await event.validateCreation(),
        isValid,
      );
    }

    const updateResponse = await this._eventRepository.updateEvent(id, event);

    return new ValidationResponse(
      updateResponse,
      await event.validateCreation(),
      isValid,
    );
  }

  public async deleteEvent(id: string): Promise<void> {
    return await this._eventRepository.deleteEvent(id);
  }
}

export default EventService;
