import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import PhoneNumberDTO from '../dtos/associationDtos/phone-number.dto';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class PhoneNumberMapper implements IMapper<PhoneNumber, PhoneNumberDTO> {
  public entityToDTO(entity: PhoneNumber): PhoneNumberDTO {
    if (!entity) {
      return null;
    }

    const dto = new PhoneNumberDTO();

    dto.countryCode = entity.countryCode;
    dto.areaCode = entity.areaCode;
    dto.number = entity.number;

    return dto;
  }

  public dtoToEntity(dto: PhoneNumberDTO): PhoneNumber {
    if (!dto) {
      return null;
    }

    const entity = new PhoneNumber();

    entity.countryCode = dto.countryCode;
    entity.areaCode = dto.areaCode;
    entity.number = dto.number;

    return entity;
  }
}

export default PhoneNumberMapper;
