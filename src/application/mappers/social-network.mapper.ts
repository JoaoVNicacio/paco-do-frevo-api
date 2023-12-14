import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import IMapper from './ientity.mapper';
import SocialNetworkDTO from '../dtos/associationDtos/social-network.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
class SocialNetworkMapper implements IMapper<SocialNetwork, SocialNetworkDTO> {
  public entityToDTO(entity: SocialNetwork): SocialNetworkDTO {
    if (!entity) {
      return null;
    }

    const dto = new SocialNetworkDTO();

    dto.socialNetworkType = entity.socialNetworkType;
    dto.url = entity.url;

    return dto;
  }

  public dtoToEntity(dto: SocialNetworkDTO): SocialNetwork {
    if (!dto) {
      return null;
    }

    const entity = new SocialNetwork();

    entity.socialNetworkType = dto.socialNetworkType;
    entity.url = dto.url;

    return entity;
  }
}

export default SocialNetworkMapper;
