import { Mapper, createMap } from '@automapper/core';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import OtherFrevoEntityDTO from '../dtos/otherFrevoMakersDtos/other-frevo-entity.dto';

/**
 * The function `generateOtherFrevoEntityProfile` creates mappings between `OtherFrevoEntity`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
 */
function generateOtherFrevoEntityProfile(mapper: Mapper) {
  createMap(mapper, OtherFrevoEntity, OtherFrevoEntityDTO);
  createMap(mapper, OtherFrevoEntityDTO, OtherFrevoEntity);
}

export default generateOtherFrevoEntityProfile;
