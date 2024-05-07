import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import Contact from 'src/domain/aggregates/associationAggregate/contact.entity';
import PhoneNumber from 'src/domain/aggregates/associationAggregate/phone-number.entity';

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
      mapFrom((src) =>
        mapper.mapArray(src.phoneNumbers ?? [], PhoneNumberDTO, PhoneNumber),
      ),
    ),
  );
}

export default generateContactProfile;
