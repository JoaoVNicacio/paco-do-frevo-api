import Contact from '../../domain/aggregates/associationAggregate/contact.entity';
import AsyncBaseValidator from './base/base.validator';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import PhoneNumberValidator from './phone-number.validator';

class ContactValidator extends AsyncBaseValidator<Contact> {
  protected mapPropsFromOrigin(origin: Contact): void {
    this.addressTo = origin.addressTo;
    this.email = origin.email;
    this.createdBy = origin.createdBy;
    this.updatedBy = origin.updatedBy;

    this.phoneNumbers = origin.phoneNumbers.map(
      (e) => new PhoneNumberValidator(e),
    );
  }

  @IsNotEmpty({ message: 'The person to be addressed is required' })
  private addressTo: string;

  @IsEmail({}, { message: 'Invalid email format' })
  private email: string;

  @ValidateNested({ each: true })
  private phoneNumbers: Array<PhoneNumberValidator>;

  @IsOptional()
  private createdBy: string;

  @IsOptional()
  private updatedBy: string;
}

export default ContactValidator;
