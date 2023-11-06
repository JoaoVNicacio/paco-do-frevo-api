import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import Event from '../entities/associationAggregate/event.entity';

interface IEventService {
  createEvent(eventDto: EventDTO): Promise<Event>;
  findById(id: string): Promise<Event | undefined>;
  updateEvent(id: string, eventDto: EventDTO): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<void>;
}

export default IEventService;
