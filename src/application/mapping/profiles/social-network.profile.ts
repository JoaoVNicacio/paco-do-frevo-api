import { Mapper, createMap } from '@automapper/core';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';

/**
 * The function `generateSocialNetworkProfile` creates mappings between `SocialNetwork`
 * and it's feature classes using the `mapper` object.
 * @param {Mapper} mapper - The `mapper` parameter is an instance of the interface `Mapper` from AutoMapper
 */
function generateSocialNetworkProfile(mapper: Mapper) {
  createMap(mapper, SocialNetwork, SocialNetworkDTO);
  createMap(mapper, SocialNetworkDTO, SocialNetwork);
}

export default generateSocialNetworkProfile;
