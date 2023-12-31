import OtherFrevoEntityAddress from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';
import OtherFrevoEntityAddressDTO from '../dtos/otherFrevoMakersDtos/other-frevo-entity-address.dto';

@Injectable()
// eslint-disable-next-line prettier/prettier
class OtherFrevoEntityAddressMapper implements IMapper<OtherFrevoEntityAddress, OtherFrevoEntityAddressDTO> {
  public entityToDTO(
    entity: OtherFrevoEntityAddress,
  ): OtherFrevoEntityAddressDTO {
    if (!entity) {
      return null;
    }

    const dto = new OtherFrevoEntityAddressDTO();

    dto.addressSite = entity.addressSite;
    dto.number = entity.number;
    dto.complement = entity.complement;
    dto.district = entity.district;
    dto.city = entity.city;
    dto.state = entity.state;
    dto.country = entity.country;
    dto.zipCode = entity.zipCode;

    return dto;
  }

  public dtoToEntity(dto: OtherFrevoEntityAddressDTO): OtherFrevoEntityAddress {
    if (!dto) {
      return null;
    }

    const entity = new OtherFrevoEntityAddress();

    entity.addressSite = dto.addressSite;
    entity.number = dto.number;
    entity.complement = dto.complement;
    entity.district = dto.district;
    entity.city = dto.city;
    entity.state = dto.state;
    entity.country = dto.country;
    entity.zipCode = dto.zipCode;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    return entity;
  }
}

export default OtherFrevoEntityAddressMapper;
