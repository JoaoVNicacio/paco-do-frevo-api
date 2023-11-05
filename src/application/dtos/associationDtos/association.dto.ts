import AssociationAddressDTO from './address.dto';

class AssociationDTO {
  public name: string;
  public foundationDate: Date;
  public addressId: string;
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
}

export default AssociationDTO;
