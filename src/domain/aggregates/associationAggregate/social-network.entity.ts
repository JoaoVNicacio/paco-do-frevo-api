import Association from './association.entity';
import {
  IsIn,
  IsNotEmpty,
  Matches,
  ValidationError,
  validate,
} from 'class-validator';
import SocialNetworkConstants from './constants/social-network.constants';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

class SocialNetwork extends UserStampedEntity<string> {
  @IsNotEmpty({ message: 'Social network type is required' })
  @IsIn(SocialNetworkConstants.socialNetworkTypes)
  @AutoMap()
  @ApiProperty()
  public socialNetworkType: string;

  @IsNotEmpty({ message: 'URL is required' })
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/, {
    message: 'Invalid URL format',
  })
  @AutoMap()
  @ApiProperty()
  public url: string;

  @ApiProperty()
  public createdBy: string;

  @ApiProperty()
  public updatedBy: string;

  public association: Association;

  public sanitizeEntityProperties(): void {
    this.socialNetworkType = this.socialNetworkType
      ? CleanStringBuilder.fromString(this.socialNetworkType)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.socialNetworkType;

    this.url = this.url?.trim();
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default SocialNetwork;
