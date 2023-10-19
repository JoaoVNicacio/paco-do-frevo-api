import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationDTO from '../dtos/associationDtos/association.dto';
import IMapper from './ientity.mapper';
import AddressMapper from './address.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class AssociationMapper implements IMapper<Association, AssociationDTO> {
  constructor(private readonly _addressMapper: AddressMapper) {}

  public entityToDTO(entity: Association): AssociationDTO {
    const dto = new AssociationDTO();

    dto.name = entity.name;
    dto.foundationDate = entity.foundationDate;
    dto.addressId = entity.addressId;
    dto.colors = entity.colors;
    dto.associationType = entity.associationType;
    dto.activeMembers = entity.activeMembers;
    dto.isSharedWithAResidence = entity.isSharedWithAResidence;
    dto.hasOwnedHeadquarters = entity.hasOwnedHeadquarters;
    dto.isLegalEntity = entity.isLegalEntity;
    dto.cnpj = entity.getCnpj;
    dto.canIssueOwnReceipts = entity.canIssueOwnReceipts;
    dto.associationHistoryNotes = entity.associationHistoryNotes;
    dto.createdBy = entity.createdBy;
    dto.updatedBy = entity.updatedBy;
    dto.address = this._addressMapper.entityToDTO(entity.address);

    return dto;
  }

  public dtoToEntity(dto: AssociationDTO): Association {
    const entity = new Association();

    entity.name = dto.name;
    entity.foundationDate = dto.foundationDate;
    entity.addressId = dto.addressId;
    entity.colors = dto.colors;
    entity.associationType = dto.associationType;
    entity.activeMembers = dto.activeMembers;
    entity.isSharedWithAResidence = dto.isSharedWithAResidence;
    entity.hasOwnedHeadquarters = dto.hasOwnedHeadquarters;
    entity.isLegalEntity = dto.isLegalEntity;
    entity.setCnpj = dto.cnpj;
    entity.canIssueOwnReceipts = dto.canIssueOwnReceipts;
    entity.associationHistoryNotes = dto.associationHistoryNotes;
    entity.createdBy = dto.createdBy;
    entity.updatedBy = dto.updatedBy;
    entity.address = this._addressMapper.dtoToEntity(dto.address);

    return entity;
  }
}

export default AssociationMapper;
