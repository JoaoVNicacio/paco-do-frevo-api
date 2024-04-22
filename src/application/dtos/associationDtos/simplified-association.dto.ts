import { AutoMap } from '@automapper/classes';
import AddressDTO from '../addressDTOs/address.dto';
import { ApiProperty } from '@nestjs/swagger';

class SimplifiedAssociationDTO {
  @AutoMap()
  @ApiProperty()
  public id: string;

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
  public address: AddressDTO | null | undefined;
}

export default SimplifiedAssociationDTO;
