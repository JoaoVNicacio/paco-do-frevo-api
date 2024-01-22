import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationDTO from '../dtos/associationDtos/association.dto';

/**
 * The function `generateAssociationProfile` creates mappings between `Association` and
 * it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the mapping Mapper from AutoMapper
 */
function generateAssociationProfile(mapper: Mapper) {
  createMap(
    mapper,
    Association,
    AssociationDTO,
    forMember(
      (dest) => dest.colors,
      mapFrom((src) => src.colors),
    ),
    forMember(
      (dest) => dest.socialNetworks,
      mapFrom((src) => src.socialNetworks),
    ),
    forMember(
      (dest) => dest.events,
      mapFrom((src) => src.events),
    ),
    forMember(
      (dest) => dest.members,
      mapFrom((src) => src.members),
    ),
    forMember(
      (dest) => dest.contacts,
      mapFrom((src) => src.contacts),
    ),
  );

  createMap(
    mapper,
    AssociationDTO,
    Association,
    forMember(
      (dest) => dest.colors,
      mapFrom((src) => src.colors),
    ),
    forMember(
      (dest) => dest.socialNetworks,
      mapFrom((src) => src.socialNetworks),
    ),
    forMember(
      (dest) => dest.events,
      mapFrom((src) => src.events),
    ),
    forMember(
      (dest) => dest.members,
      mapFrom((src) => src.members),
    ),
    forMember(
      (dest) => dest.contacts,
      mapFrom((src) => src.contacts),
    ),
  );
}

export default generateAssociationProfile;
