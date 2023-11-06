import Event from 'src/domain/entities/associationAggregate/event.entity';
import EventDTO from '../dtos/associationDtos/event.dto';
import { Injectable } from '@nestjs/common';
import IMapper from './ientity.mapper';

@Injectable()
class EventMapper implements IMapper<Event, EventDTO> {
  public entityToDTO(entity: Event): EventDTO {
    const dto = new EventDTO();
    dto.eventType = entity.eventType;
    dto.dateOfAccomplishment = entity.dateOfAccomplishment;
    dto.participantsAmount = entity.participantsAmount;

    return dto;
  }

  public dtoToEntity(dto: EventDTO): Event {
    const entity = new Event();

    entity.eventType = dto.eventType;
    entity.dateOfAccomplishment = dto.dateOfAccomplishment;
    entity.participantsAmount = dto.participantsAmount;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    return entity;
  }
}

export default EventMapper;
