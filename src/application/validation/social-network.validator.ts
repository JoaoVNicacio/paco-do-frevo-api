import AsyncBaseValidator from './base/base.validator';
import SocialNetwork from '../../domain/aggregates/associationAggregate/social-network.entity';
import { IsIn, IsNotEmpty, Matches } from 'class-validator';
import SocialNetworkConstants from '../../domain/aggregates/associationAggregate/constants/social-network.constants';

class SocialNetworkValidator extends AsyncBaseValidator<SocialNetwork> {
  private static readonly URL_REGEX: RegExp =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/;

  protected mapPropsFromOrigin(origin: SocialNetwork): void {
    this.socialNetworkType = origin.socialNetworkType;
    this.url = origin.url;
  }

  @IsNotEmpty({ message: 'Social network type is required' })
  @IsIn(SocialNetworkConstants.SOCIAL_NETWORK_TYPES)
  private socialNetworkType: string;

  @IsNotEmpty({ message: 'URL is required' })
  @Matches(SocialNetworkValidator.URL_REGEX, {
    message: 'Invalid URL format',
  })
  private url: string;
}

export default SocialNetworkValidator;
