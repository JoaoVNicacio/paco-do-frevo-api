import AssociationAddressDTO from './address.dto';
import ContactDTO from './contact.dto';
import EventDTO from './event.dto';
import MemberDTO from './member.dto';
import SocialNetworkDTO from './social-network.dto';

class AssociationDTO {
  public name: string;
  public foundationDate: Date;
  public colors: Array<string>;
  public associationType: string;
  public activeMembers: number;
  public isSharedWithAResidence: boolean;
  public hasOwnedHeadquarters: boolean;
  public isLegalEntity: boolean;
  public cnpj: string | null;
  public canIssueOwnReceipts: boolean;
  public associationHistoryNotes: string;
  public address: AssociationAddressDTO;
  public socialNetworks: Array<SocialNetworkDTO>;
  public events: Array<EventDTO>;
  public members: Array<MemberDTO>;
  public contacts: Array<ContactDTO>;
}

export default AssociationDTO;
