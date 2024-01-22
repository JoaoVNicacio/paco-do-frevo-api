import { Mapper, createMap } from '@automapper/core';
import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import OtherFrevoEntityAddress from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import AddressDTO from '../dtos/addressDTOs/address.dto';

/**
 * The function `generateAddressProfile` creates mappings between `Address`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the `Mapper` Mapper from AutoMapper
 */
function generateAddressProfile(mapper: Mapper) {
  createMap(mapper, AssociationAddress, AddressDTO);
  createMap(mapper, AddressDTO, AssociationAddress);
  createMap(mapper, OtherFrevoEntityAddress, AddressDTO);
  createMap(mapper, AddressDTO, OtherFrevoEntityAddress);
}

export default generateAddressProfile;
