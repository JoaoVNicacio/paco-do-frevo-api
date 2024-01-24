import { Mapper, createMap } from '@automapper/core';
import User from 'src/domain/entities/userAggregate/user.entity';
import UserForCreationDTO from '../dtos/userDtos/user-for-creation.dto';

/**
 * The function `generateUserProfile` creates mappings between `User`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
 */
function generateUserProfile(mapper: Mapper) {
  createMap(mapper, User, UserForCreationDTO);
  createMap(mapper, UserForCreationDTO, User);
}

export default generateUserProfile;
