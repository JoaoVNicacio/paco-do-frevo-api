import { AutoMap } from '@automapper/classes';
import AddressDTO from '../addressDTOs/address.dto';
import ContactDTO from './contact.dto';
import EventDTO from './event.dto';
import MemberDTO from './member.dto';
import SocialNetworkDTO from './social-network.dto';

class AssociationDTO {
  @AutoMap()
  public name: string;
  @AutoMap()
  public foundationDate: Date;
  @AutoMap()
  public colors: Array<string>;
  @AutoMap()
  public associationType: string;
  @AutoMap()
  public activeMembers: number;
  @AutoMap()
  public isSharedWithAResidence: boolean;
  @AutoMap()
  public hasOwnedHeadquarters: boolean;
  @AutoMap()
  public isLegalEntity: boolean;
  @AutoMap()
  public cnpj: string | null;
  @AutoMap()
  public canIssueOwnReceipts: boolean;
  @AutoMap()
  public associationHistoryNotes: string;
  @AutoMap()
  public address: AddressDTO;
  @AutoMap()
  public socialNetworks: Array<SocialNetworkDTO>;
  @AutoMap()
  public events: Array<EventDTO>;
  @AutoMap()
  public members: Array<MemberDTO>;
  @AutoMap()
  public contacts: Array<ContactDTO>;
}

export default AssociationDTO;
