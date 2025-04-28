import PhoneNumber from './phone-number.entity';
import Association from './association.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  ValidationError,
  validate,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

class Contact extends UserStampedEntity<string> {
  @IsNotEmpty({ message: 'The person to be addressed is required' })
  @AutoMap()
  @ApiProperty()
  public addressTo: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @AutoMap()
  @ApiProperty()
  public email: string;

  @ValidateNested({ each: true })
  @AutoMap()
  @ApiProperty({ type: [PhoneNumber] })
  public phoneNumbers: Array<PhoneNumber>;

  @IsOptional()
  @ApiProperty()
  @AutoMap()
  public createdBy: string;

  @IsOptional()
  @ApiProperty()
  @AutoMap()
  public updatedBy: string;

  public association: Association;

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

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default Contact;
