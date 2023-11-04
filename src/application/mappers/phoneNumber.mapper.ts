import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';
import PhoneNumberDTO from '../dtos/associationDtos/phoneNumber.dto';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class PhoneNumberMapper implements IMapper<PhoneNumber, PhoneNumberDTO> {
  public entityToDTO(entity: PhoneNumber): PhoneNumberDTO {
    const dto = new PhoneNumberDTO();
    dto.countryCode = entity.countryCode;
    dto.areaCode = entity.areaCode;
    dto.number = entity.number;
    dto.contactId = entity.contactId;
    dto.cretedBy = entity.createdBy;
    dto.updatedBy = entity.updatedBy;

    return dto;
  }

  public dtoToEntity(dto: PhoneNumberDTO): PhoneNumber {
    const entity = new PhoneNumber();

    entity.countryCode = dto.countryCode;
    entity.areaCode = dto.areaCode;
    entity.number = dto.number;
    entity.contactId = dto.contactId;
    entity.createdBy = dto.cretedBy;
    entity.updatedBy = dto.updatedBy;

    return entity;
  }
}

export default PhoneNumberMapper;
