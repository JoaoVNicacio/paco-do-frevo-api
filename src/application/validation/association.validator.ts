import AsyncBaseValidator from './base/base.validator';
import Association from '../../domain/aggregates/associationAggregate/association.entity';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import AssociationConstants from '../../domain/aggregates/associationAggregate/constants/association.constants';
import { ValidCnpjNumber } from '../../domain/validators/cnpj-number.validator';
import AddressValidator from './address.validator';
import ContactValidator from './contact.validator';
import EventValidator from './event.validator';
import SocialNetworkValidator from './social-network.validator';
import MemberValidator from './member.validator';

class AssociationValidator extends AsyncBaseValidator<Association> {
  protected mapPropsFromOrigin(origin: Association): void {
    this.name = origin.name;
    this.foundationDate = origin.foundationDate;
    this.colors = origin.colors;
    this.associationType = origin.associationType;
    this.activeMembers = origin.activeMembers;
    this.isSharedWithAResidence = origin.isSharedWithAResidence;
    this.hasOwnedHeadquarters = origin.hasOwnedHeadquarters;
    this.isLegalEntity = origin.isLegalEntity;
    this.cnpj = origin.associationCnpj;
    this.canIssueOwnReceipts = origin.canIssueOwnReceipts;
    this.associationHistoryNotes = origin.associationHistoryNotes;
    this.createdBy = origin.createdBy;
    this.updatedBy = origin.updatedBy;

    this.address = origin.address ? new AddressValidator(origin.address) : null;
    this.socialNetworks = origin.socialNetworks.map(
      (e) => new SocialNetworkValidator(e),
    );
    this.events = origin.events.map((e) => new EventValidator(e));
    this.members = origin.members.map((e) => new MemberValidator(e));
    this.contacts = origin.contacts.map((e) => new ContactValidator(e));
  }

  @IsNotEmpty()
  @IsString()
  private name: string;

  @Type(() => Date)
  private foundationDate: Date;

  @IsArray()
  @IsString({ each: true })
  private colors: Array<string>;

  @IsNotEmpty()
  @IsString()
  @IsIn(AssociationConstants.associationTypes)
  private associationType: string;

  @IsInt()
  private activeMembers: number;

  @IsBoolean()
  private isSharedWithAResidence: boolean;

  @IsBoolean()
  private hasOwnedHeadquarters: boolean;

  @IsBoolean()
  private isLegalEntity: boolean;

  @IsOptional()
  @IsString()
  @ValidCnpjNumber({ message: 'The given CNPJ is invalid' })
  private cnpj: string | null | undefined;

  @IsBoolean()
  private canIssueOwnReceipts: boolean;

  @IsNotEmpty()
  @IsString()
  private associationHistoryNotes: string;

  @IsUUID()
  @IsOptional()
  private createdBy: string;

  @IsUUID()
  @IsOptional()
  private updatedBy: string;

  @ValidateNested()
  @IsOptional()
  private address: AddressValidator | null | undefined;

  @ValidateNested()
  @IsOptional()
  private socialNetworks: Array<SocialNetworkValidator>;

  @ValidateNested()
  @IsOptional()
  private events: Array<EventValidator>;

  @ValidateNested()
  @IsOptional()
  private members: Array<MemberValidator>;

  @ValidateNested()
  @IsOptional()
  private contacts: Array<ContactValidator>;
}

export default AssociationValidator;
