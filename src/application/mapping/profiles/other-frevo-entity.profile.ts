import { Mapper, createMap } from '@automapper/core';
import OtherFrevoEntity from 'src/domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity.entity';

/**
 * The function `generateOtherFrevoEntityProfile` creates mappings between `OtherFrevoEntity`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
 */
function generateOtherFrevoEntityProfile(mapper: Mapper) {
  createMap(mapper, OtherFrevoEntity, OtherFrevoEntity);
  createMap(mapper, OtherFrevoEntity, OtherFrevoEntity);
}

export default generateOtherFrevoEntityProfile;
