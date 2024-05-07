import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Association from './association.entity';
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsPostalCode,
  ValidationError,
  validate,
  Length,
  Validate,
  IsIn,
  Equals,
} from 'class-validator';
import IAddress from '../../entityInterfaces/iaddress.entity-base';
import AddressConstants from './constants/address.constants';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

@Entity({ name: 'AssociationAddresses' })
class AssociationAddress extends UserStampedEntity<string> implements IAddress {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Address site is required' })
  @AutoMap()
  @ApiProperty()
  public addressSite: string;

  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Number is required' })
  @Validate(
    (value: string, args) => {
      const sn = args.object['SN'];
      return value === sn || /\d/.test(value);
    },
    { message: 'Number must be equal to SN or contain at least one number' },
  )
  @AutoMap()
  @ApiProperty()
  public number: string;

  @Column('text', { nullable: true })
  @IsOptional()
  @AutoMap()
  @ApiProperty()
  public complement: string;

  @Column('text')
  @IsNotEmpty({ message: 'District is required' })
  @AutoMap()
  @ApiProperty()
  public district: string;

  @Column('text')
  @IsNotEmpty({ message: 'City is required' })
  @AutoMap()
  @ApiProperty()
  public city: string;

  @Column('text')
  @IsNotEmpty({ message: 'State is required' })
  @Length(2)
  @IsIn(AddressConstants.brazilianStates)
  @AutoMap()
  @ApiProperty()
  public state: string;

  @Column('text')
  @IsNotEmpty({ message: 'Country is required' })
  @Length(2)
  @Equals('BR')
  @AutoMap()
  @ApiProperty()
  public country: string;

  @Column('text')
  @IsPostalCode('BR', { message: 'Invalid ZIP code format' })
  @AutoMap()
  @ApiProperty()
  public zipCode: string;

  @OneToOne(() => Association, (address) => address.address, {
    onDelete: 'CASCADE',
  })
  public association: Association;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @AutoMap()
  @ApiProperty()
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public createdBy: string;

  @Column('uuid', { nullable: true })
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public updatedBy: string;

  public sanitizeEntityProperties(): void {
    this.addressSite = this.addressSite
      ? CleanStringBuilder.fromString(this.addressSite)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.addressSite;

    this.number = this.number
      ? CleanStringBuilder.fromString(this.number)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.number;

    this.district = this.district
      ? CleanStringBuilder.fromString(this.district)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.district;

    this.city = this.city
      ? CleanStringBuilder.fromString(this.city)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.city;

    this.state = this.state.toLocaleUpperCase();

    this.country = this.country.toLocaleUpperCase();

    this.complement = this.complement
      ? CleanStringBuilder.fromString(this.complement)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.complement;
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

export default AssociationAddress;
