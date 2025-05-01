import AssociationAddress from './address.entity';
import Event from './event.entity';
import Member from './member.entity';
import SocialNetwork from './social-network.entity';
import Contact from './contact.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

/** This class represents a Carnival Association with its various properties, relationships and behaviour. */
class Association extends UserStampedEntity<string> {
  @AutoMap()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @ApiProperty()
  public foundationDate: Date;

  @AutoMap()
  @ApiProperty({ type: [String] })
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
  @ApiPropertyOptional()
  protected cnpj: string | null | undefined;

  @AutoMap()
  @ApiProperty()
  public canIssueOwnReceipts: boolean;

  @AutoMap()
  @ApiProperty()
  public associationHistoryNotes: string;

  @AutoMap()
  @ApiPropertyOptional({ type: AssociationAddress })
  public address: AssociationAddress | null | undefined;

  @AutoMap()
  @ApiProperty({ type: [SocialNetwork] })
  public socialNetworks: Array<SocialNetwork>;

  @AutoMap()
  @ApiProperty({ type: [Event] })
  public events: Array<Event>;

  @AutoMap()
  @ApiProperty({ type: [Member] })
  public members: Array<Member>;

  @AutoMap()
  @ApiProperty({ type: [Contact] })
  public contacts: Array<Contact>;

  public get associationCnpj(): string {
    return this.cnpj;
  }

  public set associationCnpj(value: string) {
    this.cnpj = value;
  }

  public validationDelegate:
    | ValidationDelegate<Association>
    | null
    | undefined = null;

  public async isValid(): Promise<boolean> {
    return (
      (await this.validateEntity()).length === 0 &&
      this.validationDelegate !== null &&
      this.validationDelegate !== undefined
    );
  }

  public async validateEntity(): Promise<Array<ValidationErrorSignature>> {
    if (this.validationDelegate) return this.validationDelegate(this);

    return [];
  }

  public sanitizeEntityProperties(): void {
    this.name = this.name
      ? CleanStringBuilder.fromString(this.name)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.name;

    this.associationType = this.associationType
      ? CleanStringBuilder.fromString(this.associationType)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.associationType;

    this.associationHistoryNotes = this.associationHistoryNotes
      ? CleanStringBuilder.fromString(this.associationHistoryNotes)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.associationHistoryNotes;

    this.cnpj = this.cnpj
      ? CleanStringBuilder.fromString(this.cnpj)
          .withoutSpaces()
          .withoutDashes()
          .withoutDots()
          .withoutSlashes()
          .build()
      : this.cnpj === ''
      ? null
      : this.cnpj;

    this.colors = this.colors.filter((color) => color);

    for (let color of this.colors) {
      color = CleanStringBuilder.fromString(color)
        .withoutUnnecessarySpaces()
        .withoutDashes()
        .withoutDots()
        .withoutSlashes()
        .capitalizeFirstLetter()
        .build();
    }

    this.address?.sanitizeEntityProperties();

    this.members = this.members.filter((member) => member);
    this.members.forEach((member) => member.sanitizeEntityProperties());

    this.contacts = this.contacts.filter((contact) => contact);
    this.contacts.forEach((contact) => contact.sanitizeEntityProperties());

    this.events = this.events.filter((event) => event);
    this.events.forEach((event) => event.sanitizeEntityProperties());
  }

  public override setCreationStamps(userId: string): void {
    this.createdBy = userId;
    this.address?.setCreationStamps(userId);

    this.members.forEach((member) => member.setCreationStamps(userId));

    this.contacts.forEach((contact) => contact.setCreationStamps(userId));

    this.events.forEach((event) => event.setCreationStamps(userId));
  }
}

export default Association;
