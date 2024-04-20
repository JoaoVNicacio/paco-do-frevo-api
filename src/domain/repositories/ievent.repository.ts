import Event from '../aggregates/associationAggregate/event.entity';

interface IEventRepository {
  createEvent(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | undefined>;
  updateEvent(id: string, event: Event): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<void>;
}

const IEventRepository = Symbol('IEventRepository');

export default IEventRepository;
