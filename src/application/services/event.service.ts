import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import ValidationResponse from 'src/shared/responseObjects/validation.response';
import Event from 'src/domain/aggregates/associationAggregate/event.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import { Mapper as IMapper } from '@automapper/core';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import IEventService from '../contracts/services/ievent.service';
import EventValidator from '../validation/event.validator';

@Injectable()
class EventService implements IEventService {
  constructor(
    @Inject(IEventRepository)
    private readonly _eventRepository: IEventRepository,

    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,

    @Inject(Mapper)
    private readonly _mapper: IMapper,

    @Inject(CacheManager)
    private readonly _cacheManager: Cache,

    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  public async createEntry(
    eventDto: EventDTO,
    associationId: string,
  ): Promise<ValidationResponse<Event>> {
    const event = this._mapper.map(eventDto, EventDTO, Event);

    const association =
      await this._associationRepository.getById(associationId);

    if (!association) {
      this._logger.log(
        `<⛔️> ➤ The Event for the association: ${associationId} didn't pass validation.`,
      );

      const error = new ValidationError();
      error.constraints = { notFound: 'The association does not exist' };
      error.property = 'associationId';
      error.children = [];

      return new ValidationResponse(event, [error]);
    }

    event.association = association;

    event.sanitizeEntityProperties();

    event.validationDelegate = new EventValidator().validate.bind(
      new EventValidator(),
    );

    const isValid = await event.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The Event for the association: ${associationId} didn't pass validation.`,
      );

      return new ValidationResponse(event, await event.validateEntity());
    }

    const insertResponse = await this._eventRepository.createEvent(event);

    this._logger.log(`<💾> ➤ Created the Event with id: ${insertResponse.id}`);

    return new ValidationResponse(insertResponse, await event.validateEntity());
  }

  public async getById(id: string): Promise<Event> {
    return this._eventRepository.findById(id);
  }

  public async updateEntryById(
    id: string,
    eventDto: EventDTO,
  ): Promise<ValidationResponse<Event>> {
    const event = this._mapper.map(eventDto, EventDTO, Event);

    event.sanitizeEntityProperties();

    event.validationDelegate = new EventValidator().validate.bind(
      new EventValidator(),
    );

    if (!(await event.isValid())) {
      this._logger.log(
        `<⛔️> ➤ The update for the Event ${id} didn't pass validation.`,
      );

      return new ValidationResponse(event, await event.validateEntity());
    }

    const updateResponse = await this._eventRepository.updateEvent(id, event);

    this._logger.log(`<🔁> ➤ Updated the Event with id: ${id}.`);

    await this._cacheManager.del(`events/id/${id}`);

    this._logger.log(
      `<🗑️> ➤ Deleted event with id: ${id} from cache entries due to update.`,
    );

    return new ValidationResponse(updateResponse, await event.validateEntity());
  }

  public async deleteEntryById(id: string): Promise<void> {
    await Promise.all([
      this._eventRepository.deleteEvent(id),
      this._cacheManager.del(`events/id/${id}`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted event with id: ${id} from the DB and cache entries.`,
    );
  }
}

export default EventService;
