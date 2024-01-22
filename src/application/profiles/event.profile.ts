import { Mapper, createMap } from '@automapper/core';
import EventDTO from '../dtos/associationDtos/event.dto';
import Event from 'src/domain/entities/associationAggregate/event.entity';

/**
 * The function `generateEventProfile` creates mappings between `Event`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the mapping Mapper from AutoMapper
 */
function generateEventProfile(mapper: Mapper) {
  createMap(mapper, Event, EventDTO);
  createMap(mapper, EventDTO, Event);
}

export default generateEventProfile;
