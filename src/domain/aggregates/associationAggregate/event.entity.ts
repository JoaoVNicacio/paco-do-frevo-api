import Association from './association.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

class Event extends UserStampedEntity<string> {
  @AutoMap()
  @ApiProperty()
  public eventType: string;

  @AutoMap()
  @ApiProperty()
  public dateOfAccomplishment: Date;

  @AutoMap()
  @ApiProperty()
  public participantsAmount: number;

  public association: Association;

  @ApiProperty()
  public associationId: string;

  public validationDelegate: ValidationDelegate<Event> | null | undefined =
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
    this.eventType = this.eventType
      ? CleanStringBuilder.fromString(this.eventType)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.eventType;
  }
}

export default Event;
