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

class AssociationAddress extends UserStampedEntity<string> implements IAddress {
  @IsNotEmpty({ message: 'Address site is required' })
  @AutoMap()
  @ApiProperty()
  public addressSite: string;

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

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  public complement: string;

  @IsNotEmpty({ message: 'District is required' })
  @AutoMap()
  @ApiProperty()
  public district: string;

  @IsNotEmpty({ message: 'City is required' })
  @AutoMap()
  @ApiProperty()
  public city: string;

  @IsNotEmpty({ message: 'State is required' })
  @Length(2)
  @IsIn(AddressConstants.brazilianStates)
  @AutoMap()
  @ApiProperty()
  public state: string;

  @IsNotEmpty({ message: 'Country is required' })
  @Length(2)
  @Equals('BR')
  @AutoMap()
  @ApiProperty()
  public country: string;

  @IsPostalCode('BR', { message: 'Invalid ZIP code format' })
  @AutoMap()
  @ApiProperty()
  public zipCode: string;

  public association: Association;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  public createdBy: string;

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

    this.country = this.country ? this.country.toLocaleUpperCase() : 'BR';

    this.complement = this.complement
      ? CleanStringBuilder.fromString(this.complement)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.complement;
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
