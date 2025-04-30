import OtherFrevoEntityAddress from './other-frevo-entity-address.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

/** This class represents a Frevo entity that isn't an Association with its various properties, relationships and behaviour. */
class OtherFrevoEntity extends UserStampedEntity<string> {
  @AutoMap()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @ApiProperty()
  public type: string;

  @AutoMap()
  @ApiProperty()
  public entityHistoryNotes: string;

  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;

  @AutoMap()
  @ApiProperty()
  public address: OtherFrevoEntityAddress | null | undefined;

  public validationDelegate:
    | ValidationDelegate<OtherFrevoEntity>
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
    this.name = this.name
      ? CleanStringBuilder.fromString(this.name)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.name;

    this.type = this.type
      ? CleanStringBuilder.fromString(this.type)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.type;

    this.entityHistoryNotes = this.entityHistoryNotes
      ? CleanStringBuilder.fromString(this.entityHistoryNotes)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.entityHistoryNotes;

    this.address?.sanitizeEntityProperties();
  }
}

export default OtherFrevoEntity;
