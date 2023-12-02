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

/** This class represents an Carnival Association with its various properties, relationships and behaviour. */
@Entity({ name: 'Associations' })
class Association {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  public name: string;

  @Type(() => Date)
  @Column('timestamp')
  public foundationDate: Date;

  @IsArray()
  @IsString({ each: true })
  @Column('simple-array', { nullable: true })
  public colors: Array<string>;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  public associationType: string;

  @IsInt()
  @Column('int')
  public activeMembers: number;

  @IsBoolean()
  @Column('boolean')
  public isSharedWithAResidence: boolean;

  @IsBoolean()
  @Column('boolean')
  public hasOwnedHeadquarters: boolean;

  @IsBoolean()
  @Column('boolean')
  public isLegalEntity: boolean;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  @Matches(/^(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}|\d{14})$/, {
    message: 'Invalid CNPJ format',
  })
  @ValidCnpjNumber({ message: 'The given CNPJ is invalid' })
  private cnpj: string | null;

  @IsBoolean()
  @Column('boolean')
  public canIssueOwnReceipts: boolean;

  @IsNotEmpty()
  @IsString()
  @Column('text')
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
  public address: AssociationAddress;

  @OneToMany(() => SocialNetwork, (social) => social.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  public socialNetworks: Array<SocialNetwork>;

  @OneToMany(() => Event, (event) => event.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  public events: Array<Event>;

  @OneToMany(() => Member, (member) => member.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
  public members: Array<Member>;

  @OneToMany(() => Contact, (contact) => contact.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @ValidateNested()
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
