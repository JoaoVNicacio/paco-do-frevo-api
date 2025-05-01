import Association from './association.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

class SocialNetwork extends UserStampedEntity<string> {
  @AutoMap()
  @ApiProperty()
  public socialNetworkType: string;

  @AutoMap()
  @ApiProperty()
  public url: string;

  public association: Association;

  public validationDelegate:
    | ValidationDelegate<SocialNetwork>
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
    this.socialNetworkType = this.socialNetworkType
      ? CleanStringBuilder.fromString(this.socialNetworkType)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.socialNetworkType;

    this.url = this.url?.trim();
  }
}

export default SocialNetwork;
