import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository as InjectDBAccessor } from '@nestjs/typeorm';
import Event from 'src/domain/aggregates/associationAggregate/event.entity';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import { Repository as DBAccessor } from 'typeorm';
import EventDBSchema from '../schemas/associationAggregate/event.schema';

@Injectable()
class EventRepository implements IEventRepository {
  constructor(
    @InjectDBAccessor(EventDBSchema)
    private readonly _eventDBAccessor: DBAccessor<EventDBSchema>,
  ) {}

  public async createEvent(event: Event): Promise<Event> {
    const createdEvent = this._eventDBAccessor.create(event);

    return await this._eventDBAccessor.save(createdEvent);
  }

  public async findById(id: string): Promise<Event> {
    return await this._eventDBAccessor.findOne({
      where: { id },
    });
  }

  public async updateEvent(id: string, event: Event): Promise<Event> {
    const existingEvent = await this.findById(id);

    if (!existingEvent)
      throw new NotFoundException('Número de telefone não encontrado.');

    this._eventDBAccessor.merge(
      EventDBSchema.fromDomainEntity(existingEvent),
      event,
    );

    return await this._eventDBAccessor.save(existingEvent);
  }

  public async deleteEvent(id: string): Promise<void> {
    const result = await this._eventDBAccessor.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Número de telefone não encontrado.');
  }
}

export default EventRepository;
