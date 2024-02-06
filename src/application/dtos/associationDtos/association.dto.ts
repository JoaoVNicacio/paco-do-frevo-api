import { AutoMap } from '@automapper/classes';
import AddressDTO from '../addressDTOs/address.dto';
import ContactDTO from './contact.dto';
import EventDTO from './event.dto';
import MemberDTO from './member.dto';
import SocialNetworkDTO from './social-network.dto';
import { ApiProperty } from '@nestjs/swagger';

class AssociationDTO {
  @AutoMap()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @ApiProperty()
  public foundationDate: Date;

  @AutoMap()
  @ApiProperty()
  public colors: Array<string>;

  @AutoMap()
  @ApiProperty()
  public associationType: string;

  @AutoMap()
  @ApiProperty()
  public activeMembers: number;

  @AutoMap()
  @ApiProperty()
  public isSharedWithAResidence: boolean;

  @AutoMap()
  @ApiProperty()
  public hasOwnedHeadquarters: boolean;

  @AutoMap()
  @ApiProperty()
  public isLegalEntity: boolean;

  @AutoMap()
  @ApiProperty()
  public cnpj: string | null;

  @AutoMap()
  @ApiProperty()
  public canIssueOwnReceipts: boolean;

  @AutoMap()
  @ApiProperty()
  public associationHistoryNotes: string;

  @AutoMap()
  @ApiProperty()
  public address: AddressDTO;

  @AutoMap()
  @ApiProperty({ type: [SocialNetworkDTO] })
  public socialNetworks: Array<SocialNetworkDTO>;

  @AutoMap()
  @ApiProperty({ type: [EventDTO] })
  public events: Array<EventDTO>;

  @AutoMap()
  @ApiProperty({ type: [MemberDTO] })
  public members: Array<MemberDTO>;

  @AutoMap()
  @ApiProperty({ type: [ContactDTO] })
  public contacts: Array<ContactDTO>;
}

export default AssociationDTO;
