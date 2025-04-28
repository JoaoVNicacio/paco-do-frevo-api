import AssociationAddress from './address.entity';
import Event from './event.entity';
import Member from './member.entity';
import SocialNetwork from './social-network.entity';
import Contact from './contact.entity';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidationError,
  validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ValidCnpjNumber } from 'src/domain/validators/cnpj-number.validator';
import AssociationConstants from './constants/association.constants';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

/** This class represents a Carnival Association with its various properties, relationships and behaviour. */
class Association extends UserStampedEntity<string> {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  @ApiProperty()
  public name: string;

  @Type(() => Date)
  @AutoMap()
  @ApiProperty()
  public foundationDate: Date;

  @IsArray()
  @IsString({ each: true })
  @AutoMap()
  @ApiProperty({ type: [String] })
  public colors: Array<string>;

  @IsNotEmpty()
  @IsString()
  @IsIn(AssociationConstants.associationTypes)
  @AutoMap()
  @ApiProperty()
  public associationType: string;

  @IsInt()
  @AutoMap()
  @ApiProperty()
  public activeMembers: number;

  @IsBoolean()
  @AutoMap()
  @ApiProperty()
  public isSharedWithAResidence: boolean;

  @IsBoolean()
  @AutoMap()
  @ApiProperty()
  public hasOwnedHeadquarters: boolean;

  @IsBoolean()
  @AutoMap()
  @ApiProperty()
  public isLegalEntity: boolean;

  @IsOptional()
  @IsString()
  @ValidCnpjNumber({ message: 'The given CNPJ is invalid' })
  @AutoMap()
  @ApiPropertyOptional()
  protected cnpj: string | null | undefined;

  @IsBoolean()
  @AutoMap()
  @ApiProperty()
  public canIssueOwnReceipts: boolean;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  @ApiProperty()
  public associationHistoryNotes: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty()
  public createdBy: string;

  @ApiProperty()
  public updatedBy: string;

  @ValidateNested()
  @AutoMap()
  @ApiPropertyOptional({ type: AssociationAddress })
  @IsOptional()
  public address: AssociationAddress | null | undefined;

  @ValidateNested()
  @AutoMap()
  @ApiProperty({ type: [SocialNetwork] })
  @IsOptional()
  public socialNetworks: Array<SocialNetwork>;

  @ValidateNested()
  @AutoMap()
  @ApiProperty({ type: [Event] })
  @IsOptional()
  public events: Array<Event>;

  @ValidateNested()
  @AutoMap()
  @ApiProperty({ type: [Member] })
  @IsOptional()
  public members: Array<Member>;

  @ValidateNested()
  @AutoMap()
  @ApiProperty({ type: [Contact] })
  @IsOptional()
  public contacts: Array<Contact>;

  public get associationCnpj(): string {
    return this.cnpj;
  }

  public set associationCnpj(value: string) {
    this.cnpj = value;
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

  public setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default Association;
