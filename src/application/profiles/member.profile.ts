import { Mapper, createMap } from '@automapper/core';
import Member from 'src/domain/entities/associationAggregate/member.entity';
import MemberDTO from '../dtos/associationDtos/member.dto';

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
