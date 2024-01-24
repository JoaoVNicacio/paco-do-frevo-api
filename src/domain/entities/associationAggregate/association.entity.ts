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
  Matches,
  ValidateNested,
  ValidationError,
  validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ValidCnpjNumber } from 'src/domain/validators/cnpj-number.validator';
import AssociationConstants from './constants/association.constants';
import { AutoMap } from '@automapper/classes';

/** This class represents an Carnival Association with its various properties, relationships and behaviour. */
@Entity({ name: 'Associations' })
class Association {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @AutoMap()
  public name: string;

  @Type(() => Date)
  @Column('timestamp')
  @AutoMap()
  public foundationDate: Date;

  @IsArray()
  @IsString({ each: true })
  @Column('simple-array', { nullable: true })
  @AutoMap()
  public colors: Array<string>;

  @IsNotEmpty()
  @IsString()
  @IsIn(AssociationConstants.associationTypes)
  @Column('text')
  @AutoMap()
  public associationType: string;

  @IsInt()
  @Column('int')
  @AutoMap()
  public activeMembers: number;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  public isSharedWithAResidence: boolean;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  public hasOwnedHeadquarters: boolean;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  public isLegalEntity: boolean;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @Matches(/^(\d{14})$/, {
    message: 'Invalid CNPJ format',
  })
  @ValidCnpjNumber({ message: 'The given CNPJ is invalid' })
  @AutoMap()
  private cnpj: string | null;

  @IsBoolean()
  @Column('boolean')
  @AutoMap()
  public canIssueOwnReceipts: boolean;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @AutoMap()
  public associationHistoryNotes: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  @OneToOne(() => AssociationAddress, (address) => address.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @AutoMap()
  public address: AssociationAddress;

  @OneToMany(() => SocialNetwork, (social) => social.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @AutoMap()
  public socialNetworks: Array<SocialNetwork>;

  @OneToMany(() => Event, (event) => event.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @AutoMap()
  public events: Array<Event>;

  @OneToMany(() => Member, (member) => member.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @AutoMap()
  public members: Array<Member>;

  @OneToMany(() => Contact, (contact) => contact.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  @AutoMap()
  public contacts: Array<Contact>;

  public get getCnpj(): string {
    return this.cnpj;
  }

  public set setCnpj(value: string) {
    this.cnpj = value;
  }
  public setCreationStamps(userId: string): void {
    this.createdBy = userId;
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
