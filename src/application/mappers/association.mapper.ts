import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationDTO from '../dtos/associationDtos/association.dto';
import IMapper from './ientity.mapper';
import AddressMapper from './address.mapper';
import { Injectable } from '@nestjs/common';
import ContactMapper from './contact.mapper';
import EventMapper from './event.mapper';
import MemberMapper from './member.mapper';
import SocialNetworkMapper from './social-network.mapper';

@Injectable()
class AssociationMapper implements IMapper<Association, AssociationDTO> {
  constructor(
    private readonly _addressMapper: AddressMapper,
    private readonly _contactMapper: ContactMapper,
    private readonly _eventMapper: EventMapper,
    private readonly _memberMapper: MemberMapper,
    private readonly _socialNetworkMapper: SocialNetworkMapper,
  ) {}

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
    dto.address = this._addressMapper.entityToDTO(entity.address);
    dto.contacts = entity.contacts.map((contact) =>
      this._contactMapper.entityToDTO(contact),
    );
    dto.socialNetworks = entity.socialNetworks.map((socialNetwork) =>
      this._socialNetworkMapper.entityToDTO(socialNetwork),
    );
    dto.events = entity.events.map((event) =>
      this._eventMapper.entityToDTO(event),
    );
    dto.members = entity.members.map((member) =>
      this._memberMapper.entityToDTO(member),
    );

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
    entity.address = this._addressMapper.dtoToEntity(dto.address);
    entity.contacts = dto.contacts.map((contact) =>
      this._contactMapper.dtoToEntity(contact),
    );
    entity.socialNetworks = dto.socialNetworks.map((socialNetwork) =>
      this._socialNetworkMapper.dtoToEntity(socialNetwork),
    );
    entity.events = dto.events.map((event) =>
      this._eventMapper.dtoToEntity(event),
    );
    entity.members = dto.members.map((member) =>
      this._memberMapper.dtoToEntity(member),
    );

    return entity;
  }
}

export default AssociationMapper;
