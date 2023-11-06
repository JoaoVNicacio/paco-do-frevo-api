import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';
import IMapper from './ientity.mapper';
import SocialNetworkDTO from '../dtos/associationDtos/social_network.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
class SocialNetworkMapper implements IMapper<SocialNetwork, SocialNetworkDTO> {
  public entityToDTO(entity: SocialNetwork): SocialNetworkDTO {
    const dto = new SocialNetworkDTO();

    dto.socialNetworkType = entity.socialNetworkType;
    dto.url = entity.url;

    return dto;
  }

  public dtoToEntity(dto: SocialNetworkDTO): SocialNetwork {
    const entity = new SocialNetwork();

    entity.socialNetworkType = dto.socialNetworkType;
    entity.url = dto.url;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    return entity;
  }
}

export default SocialNetworkMapper;
