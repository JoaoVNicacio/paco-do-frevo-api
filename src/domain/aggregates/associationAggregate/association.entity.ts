import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
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

/** This class represents an Carnival Association with its various properties, relationships and behaviour. */
@Entity({ name: 'Associations' })
class Association extends UserStampedEntity<string> {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @AutoMap()
  @ApiProperty()
  public name: string;

  @Type(() => Date)
  @Column('timestamp')
  @AutoMap()
  @ApiProperty()
  public foundationDate: Date;

  @IsArray()
  @IsString({ each: true })
  @Column('simple-array', { nullable: true })
  @AutoMap()
  @ApiProperty({ type: [String] })
  public colors: Array<string>;

  @IsNotEmpty()
  @IsString()
  @IsIn(AssociationConstants.associationTypes)
  @Column('text')
  @AutoMap()
  @ApiProperty()
  public associationType: string;

  @IsInt()
  @Column('int')
  @AutoMap()
  @ApiProperty()
  public activeMembers: number;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  @ApiProperty()
  public isSharedWithAResidence: boolean;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  @ApiProperty()
  public hasOwnedHeadquarters: boolean;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  @ApiProperty()
  public isLegalEntity: boolean;

  @IsOptional()
  @IsString()
  @Column({ nullable: true, default: null })
  @ValidCnpjNumber({ message: 'The given CNPJ is invalid' })
  @AutoMap()
  @ApiPropertyOptional()
  private cnpj: string | null | undefined;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  @ApiProperty()
  public canIssueOwnReceipts: boolean;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @AutoMap()
  @ApiProperty()
  public associationHistoryNotes: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  @ApiProperty()
  public createdBy: string;

  @Column('uuid', { nullable: true })
  @ApiProperty()
  public updatedBy: string;

  @OneToOne(() => AssociationAddress, (address) => address.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @AutoMap()
  @ApiPropertyOptional({ type: AssociationAddress })
  @IsOptional()
  public address: AssociationAddress | null | undefined;

  @OneToMany(() => SocialNetwork, (social) => social.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @AutoMap()
  @ApiProperty({ type: [SocialNetwork] })
  @IsOptional()
  public socialNetworks: Array<SocialNetwork>;

  @OneToMany(() => Event, (event) => event.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @AutoMap()
  @ApiProperty({ type: [Event] })
  @IsOptional()
  public events: Array<Event>;

  @OneToMany(() => Member, (member) => member.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @AutoMap()
  @ApiProperty({ type: [Member] })
  @IsOptional()
  public members: Array<Member>;

  @OneToMany(() => Contact, (contact) => contact.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
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

  public setCreationStamps(userId: string): void {
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
