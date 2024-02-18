import { Mapper, createMap } from '@automapper/core';
import User from 'src/domain/entities/userAggregate/user.entity';
import UserForCreationDTO from '../dtos/userDtos/user-for-creation.dto';
import UserDTO from '../dtos/userDtos/user.dto';

/**
 * The function `generateUserProfile` creates mappings between `User`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
 */
function generateUserProfile(mapper: Mapper) {
  createMap(mapper, User, UserForCreationDTO);
  createMap(mapper, UserForCreationDTO, User);
  createMap(mapper, User, UserDTO);
  createMap(mapper, UserDTO, User);
  createMap(mapper, UserForCreationDTO, UserDTO);
  createMap(mapper, UserDTO, UserForCreationDTO);
}

export default generateUserProfile;
