import PhoneNumber from './phone-number.entity';
import Association from './association.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

class Contact extends UserStampedEntity<string> {
  @AutoMap()
  @ApiProperty()
  public addressTo: string;

  @AutoMap()
  @ApiProperty()
  public email: string;

  @AutoMap()
  @ApiProperty({ type: [PhoneNumber] })
  public phoneNumbers: Array<PhoneNumber>;

  public association: Association;

  public validationDelegate: ValidationDelegate<Contact> | null | undefined =
    null;

  public async isValid(): Promise<boolean> {
    return (
      (await this.validateEntity()).length === 0 &&
      this.validationDelegate !== null &&
      this.validationDelegate !== undefined
    );
  }

  public async validateEntity(): Promise<Array<ValidationErrorSignature>> {
    if (this.validationDelegate) return this.validationDelegate(this);

    return [];
  }

  public sanitizeEntityProperties(): void {
    this.addressTo = this.addressTo
      ? CleanStringBuilder.fromString(this.addressTo)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.addressTo;

    this.phoneNumbers = this.phoneNumbers.filter((phoneNumber) => phoneNumber);

    this.phoneNumbers.forEach((phoneNumber) =>
      phoneNumber.sanitizeEntityProperties(),
    );
  }
}

export default Contact;
