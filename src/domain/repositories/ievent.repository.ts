import Event from '../entities/associationAggregate/event.entity';

interface IEventRepository {
  createEvent(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | undefined>;
  updateEvent(id: string, event: Event): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<void>;
}

export default IEventRepository;
