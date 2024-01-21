import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import Event from '../entities/associationAggregate/event.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';

interface IEventService {
  createEvent(
    eventDto: EventDTO,
    associationId: string,
  ): Promise<ValidationResponse<Event>>;
  findById(id: string): Promise<Event | undefined>;
  updateEvent(
    id: string,
    eventDto: EventDTO,
  ): Promise<ValidationResponse<Event>>;
  deleteEvent(id: string): Promise<void>;
}

const IEventService = Symbol('IEventService');

export default IEventService;
