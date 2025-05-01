import Contact from './contact.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

class PhoneNumber extends UserStampedEntity<string> {
  @AutoMap()
  @ApiProperty()
  public countryCode: string;

  @AutoMap()
  @ApiProperty()
  public areaCode: string;

  @AutoMap()
  @ApiProperty()
  public number: string;

  public contact: Contact;

  public validationDelegate:
    | ValidationDelegate<PhoneNumber>
    | null
    | undefined = null;

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
    if (this.number) {
      this.number = CleanStringBuilder.fromString(this.number)
        .withoutSpaces()
        .withoutDashes()
        .build();

      this.number = /^[789]/.test(this.number)
        ? this.number.padStart(9, '9')
        : this.number;
    }

    this.countryCode = this.countryCode
      ? CleanStringBuilder.fromString(this.countryCode).withoutSpaces().build()
      : this.countryCode;

    this.areaCode = this.areaCode
      ? CleanStringBuilder.fromString(this.areaCode).withoutSpaces().build()
      : this.areaCode;
  }
}

export default PhoneNumber;
