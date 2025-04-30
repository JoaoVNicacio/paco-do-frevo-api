import AsyncBaseValidator from './base/base.validator';
import IAddress from '../../domain/entityInterfaces/iaddress.entity-base';
import {
  Equals,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPostalCode,
  IsUUID,
  Length,
  Validate,
} from 'class-validator';
import AddressConstants from '../../domain/aggregates/associationAggregate/constants/address.constants';

class AddressValidator extends AsyncBaseValidator<IAddress> {
  protected mapPropsFromOrigin(origin: IAddress): void {
    this.addressSite = origin.addressSite;
    this.number = origin.number;
    this.complement = origin.complement;
    this.district = origin.district;
    this.city = origin.city;
    this.state = origin.state;
    this.country = origin.country;
    this.zipCode = origin.zipCode;
    this.createdBy = origin.createdBy;
    this.updatedBy = origin.updatedBy;
  }

  @IsNotEmpty({ message: 'Address site is required' })
  private addressSite: string;

  @IsNotEmpty({ message: 'Number is required' })
  @Validate(
    (value: string, args) => {
      const sn = args.object['SN'];
      return value === sn || /\d/.test(value);
    },
    { message: 'Number must be equal to SN or contain at least one number' },
  )
  private number: string;

  @IsOptional()
  private complement: string;

  @IsNotEmpty({ message: 'District is required' })
  private district: string;

  @IsNotEmpty({ message: 'City is required' })
  private city: string;

  @IsNotEmpty({ message: 'State is required' })
  @Length(2)
  @IsIn(AddressConstants.brazilianStates)
  private state: string;

  @IsNotEmpty({ message: 'Country is required' })
  @Length(2)
  @Equals('BR')
  private country: string;

  @IsPostalCode('BR', { message: 'Invalid ZIP code format' })
  private zipCode: string;

  @IsUUID()
  @IsOptional()
  private createdBy: string;

  @IsUUID()
  @IsOptional()
  private updatedBy: string;
}

export default AddressValidator;
