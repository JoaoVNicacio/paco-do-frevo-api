import { Mapper, createMap } from '@automapper/core';
import MemberDTO from 'src/application/dtos/associationDtos/member.dto';
import Member from 'src/domain/entities/associationAggregate/member.entity';

/**
 * The function `generateMemberProfile` creates mappings between `Member`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
 */
function generateMemberProfile(mapper: Mapper) {
  createMap(mapper, Member, MemberDTO);
  createMap(mapper, MemberDTO, Member);
}

export default generateMemberProfile;
