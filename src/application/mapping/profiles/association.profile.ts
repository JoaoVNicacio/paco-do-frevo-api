import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import MemberDTO from 'src/application/dtos/associationDtos/member.dto';
import SimplifiedAssociationDTO from 'src/application/dtos/associationDtos/simplified-association.dto';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import Contact from 'src/domain/aggregates/associationAggregate/contact.entity';
import Member from 'src/domain/aggregates/associationAggregate/member.entity';
import SocialNetwork from 'src/domain/aggregates/associationAggregate/social-network.entity';
import Event from 'src/domain/aggregates/associationAggregate/event.entity';

/**
 * The function `generateAssociationProfile` creates mappings between `Association` and
 * it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
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
      mapFrom((src) => src.colors ?? []),
    ),
    forMember(
      (dest) => dest.socialNetworks,
      mapFrom((src) =>
        mapper.mapArray(
          src.socialNetworks ?? [],
          SocialNetworkDTO,
          SocialNetwork,
        ),
      ),
    ),
    forMember(
      (dest) => dest.events,
      mapFrom((src) => mapper.mapArray(src.events ?? [], EventDTO, Event)),
    ),
    forMember(
      (dest) => dest.members,
      mapFrom((src) => mapper.mapArray(src.members ?? [], MemberDTO, Member)),
    ),
    forMember(
      (dest) => dest.contacts,
      mapFrom((src) =>
        mapper.mapArray(src.contacts ?? [], ContactDTO, Contact),
      ),
    ),
  );

  createMap(
    mapper,
    Association,
    SimplifiedAssociationDTO,
    forMember(
      (dest) => dest.colors,
      mapFrom((src) => src.colors),
    ),
    forMember(
      (dest) => dest.address,
      mapFrom((src) => src.address),
    ),
    forMember(
      (dest) => dest.id,
      mapFrom((src) => src.id),
    ),
  );
}

export default generateAssociationProfile;
