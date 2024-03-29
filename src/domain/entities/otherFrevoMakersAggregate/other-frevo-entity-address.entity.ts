import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
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
import IAddress from '../entityInterfaces/iaddress.entity-base';
import AddressConstants from '../associationAggregate/constants/address.constants';
import OtherFrevoEntity from './other-frevo-entity.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'OtherFrevoEntityAddresses' })
class OtherFrevoEntityAddress implements IAddress {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
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
  public complement: string | null;

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

  @OneToOne(() => OtherFrevoEntity, (address) => address.address)
  public otherFrevoEntity: OtherFrevoEntity;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
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

export default OtherFrevoEntityAddress;
