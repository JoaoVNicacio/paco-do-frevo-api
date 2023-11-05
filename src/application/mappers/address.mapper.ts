import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import AssociationAddressDTO from '../dtos/associationDtos/address.dto';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
// eslint-disable-next-line prettier/prettier
class AddressMapper implements IMapper<AssociationAddress, AssociationAddressDTO> {
  public entityToDTO(entity: AssociationAddress): AssociationAddressDTO {
    const dto = new AssociationAddressDTO();

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

  public dtoToEntity(dto: AssociationAddressDTO): AssociationAddress {
    const entity = new AssociationAddress();

    entity.addressSite = dto.addressSite;
    entity.number = dto.number;
    entity.complement = dto.complement;
    entity.district = dto.district;
    entity.city = dto.city;
    entity.state = dto.state;
    entity.country = dto.country;
    entity.zipCode = dto.zipCode;

    return entity;
  }
}

export default AddressMapper;
