import AsyncBaseValidator from './base/base.validator';
import PhoneNumber from '../../domain/aggregates/associationAggregate/phone-number.entity';
import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator';

class PhoneNumberValidator extends AsyncBaseValidator<PhoneNumber> {
  protected mapPropsFromOrigin(origin: PhoneNumber): void {
    this.countryCode = origin.countryCode;
    this.areaCode = origin.areaCode;
    this.number = origin.number;
  }

  @IsNotEmpty({ message: 'Country code is required' })
  @Length(2, 2, { message: 'Country code must contain exactly 2 numbers' })
  @IsNumberString()
  private countryCode: string;

  @IsNotEmpty({ message: 'Area code is required' })
  @Length(2, 2, { message: 'Area code must contain exactly 2 numbers' })
  @IsNumberString()
  private areaCode: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^[2-5]\d{7}$|^9[7-9]\d{7}$/)
  private number: string;
}

export default PhoneNumberValidator;
