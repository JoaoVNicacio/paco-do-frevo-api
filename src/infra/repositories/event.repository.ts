import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectContext } from '@nestjs/typeorm';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import { Repository as DBContext } from 'typeorm';

@Injectable()
class EventRepository implements IEventRepository {
  constructor(
    @InjectContext(Event)
    private readonly _eventContext: DBContext<Event>,
  ) {}

  public async createEvent(event: Event): Promise<Event> {
    const createdEvent = this._eventContext.create(event);

    return await this._eventContext.save(createdEvent);
  }

  public async findById(id: string): Promise<Event> {
    return await this._eventContext.findOne({
      where: { id },
    });
  }

  public async updateEvent(id: string, event: Event): Promise<Event> {
    const existingEvent = await this.findById(id);

    if (!existingEvent) {
      throw new Error('Número de telefone não encontrado.');
    }

    this._eventContext.merge(existingEvent, event);

    return await this._eventContext.save(existingEvent);
  }

  public async deleteEvent(id: string): Promise<void> {
    const result = await this._eventContext.delete(id);

    if (result.affected === 0) {
      throw new Error('Número de telefone não encontrado.');
    }
  }
}

export default EventRepository;
