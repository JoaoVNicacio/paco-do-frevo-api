import { Mapper, createMap } from '@automapper/core';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import PhoneNumberDTO from '../dtos/associationDtos/phone-number.dto';

/**
 * The function `generatePhoneNumberProfile` creates mappings between `PhoneNumber` and
 * it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the mapping Mapper from AutoMapper
 */
function generatePhoneNumberProfile(mapper: Mapper) {
  createMap(mapper, PhoneNumber, PhoneNumberDTO);
  createMap(mapper, PhoneNumberDTO, PhoneNumber);
}

export default generatePhoneNumberProfile;
