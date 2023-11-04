import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import IEventRepository from 'src/domain/repositories/ievent.repository';
import { Repository } from 'typeorm';

@Injectable()
class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private _eventRepository: Repository<Event>,
  ) {}

  public async createEvent(event: Event): Promise<Event> {
    const createdEvent = this._eventRepository.create(event);

    return await this._eventRepository.save(createdEvent);
  }

  public async findById(id: string): Promise<Event> {
    return await this._eventRepository.findOne({
      where: { id },
    });
  }

  public async updateEvent(id: string, event: Event): Promise<Event> {
    const existingEvent = await this.findById(id);

    if (!existingEvent) {
      throw new Error('Número de telefone não encontrado.');
    }

    this._eventRepository.merge(existingEvent, event);

    return await this._eventRepository.save(existingEvent);
  }

  public async deleteEvent(id: string): Promise<void> {
    const result = await this._eventRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Número de telefone não encontrado.');
    }
  }
}

export default EventRepository;
