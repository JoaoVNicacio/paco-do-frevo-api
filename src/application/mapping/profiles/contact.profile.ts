import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';

/**
 * The function `generateContactProfile` creates mappings between `Contact` and
 * it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
 */
function generateContactProfile(mapper: Mapper) {
  createMap(
    mapper,
    Contact,
    ContactDTO,
    forMember(
      (dest) => dest.phoneNumbers,
      mapFrom((src) => src.phoneNumbers),
    ),
  );

  createMap(
    mapper,
    ContactDTO,
    Contact,
    forMember(
      (dest) => dest.phoneNumbers,
      mapFrom((src) => src.phoneNumbers),
    ),
  );
}

export default generateContactProfile;
