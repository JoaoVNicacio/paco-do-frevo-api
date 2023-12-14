import { Injectable } from '@nestjs/common';
import IMapper from './ientity.mapper';
import OtherFrevoEntityDTO from '../dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import OtherFrevoEntityAddressMapper from './other-frevo-entity-address.mapper';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';

@Injectable()
class OtherFrevoEntityMapper
  implements IMapper<OtherFrevoEntity, OtherFrevoEntityDTO>
{
  constructor(
    private readonly _otherFrevoEntityAddressMapper: OtherFrevoEntityAddressMapper,
  ) {}

  public entityToDTO(entity: OtherFrevoEntity): OtherFrevoEntityDTO {
    if (!entity) {
      return null;
    }

    const dto = new OtherFrevoEntityDTO();

    dto.name = entity.name;
    dto.address = this._otherFrevoEntityAddressMapper.entityToDTO(
      entity.address,
    );
    dto.type = entity.type;
    dto.entityHistoryNotes = entity.entityHistoryNotes;
    dto.actuationTimeInMonths = entity.actuationTimeInMonths;

    return dto;
  }

  public dtoToEntity(dto: OtherFrevoEntityDTO): OtherFrevoEntity {
    if (!dto) {
      return null;
    }

    const entity = new OtherFrevoEntity();

    entity.name = dto.name;
    entity.address = this._otherFrevoEntityAddressMapper.dtoToEntity(
      dto.address,
    );
    entity.type = dto.type;
    entity.entityHistoryNotes = dto.entityHistoryNotes;
    entity.actuationTimeInMonths = dto.actuationTimeInMonths;
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    return entity;
  }
}

export default OtherFrevoEntityMapper;
