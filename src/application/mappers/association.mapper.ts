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
    if (!entity) {
      return null;
    }

    const dto = new AssociationDTO();

    dto.name = entity.name;
    dto.foundationDate = entity.foundationDate;
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

    dto.contacts =
      entity.contacts != null || entity.contacts.length > 0
        ? entity.contacts.map((contact) =>
            this._contactMapper.entityToDTO(contact),
          )
        : [];

    dto.socialNetworks =
      entity.socialNetworks != null && entity.socialNetworks.length > 0
        ? entity.socialNetworks.map((socialNetwork) =>
            this._socialNetworkMapper.entityToDTO(socialNetwork),
          )
        : [];

    dto.events =
      entity.events != null && entity.events.length > 0
        ? entity.events.map((event) => this._eventMapper.entityToDTO(event))
        : [];

    dto.members =
      entity.members != null && entity.members.length > 0
        ? entity.members.map((member) => this._memberMapper.entityToDTO(member))
        : [];

    return dto;
  }

  public dtoToEntity(dto: AssociationDTO): Association {
    if (!dto) {
      return null;
    }

    const entity = new Association();

    entity.name = dto.name;
    entity.foundationDate = dto.foundationDate;
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

    entity.contacts =
      dto.contacts !== null && dto.contacts.length > 0
        ? dto.contacts.map((contact) =>
            this._contactMapper.dtoToEntity(contact),
          )
        : [];

    entity.socialNetworks =
      dto.socialNetworks !== null && dto.socialNetworks.length > 0
        ? dto.socialNetworks.map((socialNetwork) =>
            this._socialNetworkMapper.dtoToEntity(socialNetwork),
          )
        : [];

    entity.events =
      dto.events !== null && dto.events.length > 0
        ? dto.events.map((event) => this._eventMapper.dtoToEntity(event))
        : [];

    entity.members =
      dto.members !== null && dto.members.length > 0
        ? dto.members.map((member) => this._memberMapper.dtoToEntity(member))
        : [];

    return entity;
  }
}

export default AssociationMapper;
