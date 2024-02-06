import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import IEventService from 'src/domain/services/ievent.service';
import { Mapper as IMapper } from '@automapper/core';
import { CACHE_MANAGER as CacheManager, Cache } from '@nestjs/cache-manager';

@Injectable()
class EventService implements IEventService {
  constructor(
    @Inject(IEventRepository)
    private readonly _eventRepository: IEventRepository,

    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,

    @Inject('IMapper')
    private readonly _mapper: IMapper,

    @Inject(CacheManager)
    private readonly _cacheManager: Cache,
  ) {}

  public async createEvent(
    eventDto: EventDTO,
    associationId: string,
  ): Promise<ValidationResponse<Event>> {
    const event = this._mapper.map(eventDto, EventDTO, Event);

    const association =
      await this._associationRepository.getById(associationId);

    if (!association) {
      const error = new ValidationError();
      error.constraints = { associationId: 'The association does not exists' };

      return new ValidationResponse(event, [error]);
    }

    event.association = association;

    const isValid = await event.isValid();

    if (!isValid) {
      return new ValidationResponse(event, await event.validateCreation());
    }

    const insertResponse = await this._eventRepository.createEvent(event);

    return new ValidationResponse(
      insertResponse,
      await event.validateCreation(),
    );
  }

  public async findById(id: string): Promise<Event> {
    return this._eventRepository.findById(id);
  }

  public async updateEvent(
    id: string,
    eventDto: EventDTO,
  ): Promise<ValidationResponse<Event>> {
    const event = this._mapper.map(eventDto, EventDTO, Event);

    if (!(await event.isValid())) {
      return new ValidationResponse(event, await event.validateCreation());
    }

    const updateResponse = await this._eventRepository.updateEvent(id, event);

    await this._cacheManager.del(`events/id/${id}`);

    return new ValidationResponse(
      updateResponse,
      await event.validateCreation(),
    );
  }

  public async deleteEvent(id: string): Promise<void> {
    return await this._eventRepository
      .deleteEvent(id)
      .then(async () => await this._cacheManager.del(`events/id/${id}`));
  }
}

export default EventService;
