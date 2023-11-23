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
import IAddress from '../entityInterfaces/iaddress.entity-base';
import AddressConstants from './constants/address.constants';

@Entity({ name: 'AssociationAddresses' })
class AssociationAddress implements IAddress {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Address site is required' })
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
  public number: string;

  @Column('text', { nullable: true })
  @IsOptional()
  public complement: string;

  @Column('text')
  @IsNotEmpty({ message: 'District is required' })
  public district: string;

  @Column('text')
  @IsNotEmpty({ message: 'City is required' })
  public city: string;

  @Column('text')
  @IsNotEmpty({ message: 'State is required' })
  @Length(2)
  @IsIn(AddressConstants.brazilianstates)
  public state: string;

  @Column('text')
  @IsNotEmpty({ message: 'Country is required' })
  @Length(2)
  @Equals('BR')
  public country: string;

  @Column('text')
  @IsPostalCode('BR', { message: 'Invalid ZIP code format' })
  public zipCode: string;

  @OneToOne(() => Association, (address) => address.address)
  public association: Association;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  @IsUUID()
  @IsOptional()
  public createdBy: string;

  @Column('uuid', { nullable: true })
  @IsUUID()
  @IsOptional()
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

export default AssociationAddress;
