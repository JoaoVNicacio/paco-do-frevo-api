import Association from './association.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

class Member extends UserStampedEntity<string> {
  @AutoMap()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @ApiProperty()
  public surname: string;

  @AutoMap()
  @ApiProperty()
  public role: string;

  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;

  @AutoMap()
  @ApiProperty()
  public isFrevoTheMainRevenueIncome: boolean;

  public association: Association;

  @ApiProperty()
  public associationId: string;

  public validationDelegate: ValidationDelegate<Member> | null | undefined =
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
    this.name = this.name
      ? CleanStringBuilder.fromString(this.name)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.name;

    this.surname = this.surname
      ? CleanStringBuilder.fromString(this.surname)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.surname;
  }
}

export default Member;
