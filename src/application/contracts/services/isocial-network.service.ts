import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';

interface ISocialNetworkService {
  createSocialNetwork(
    socialNetowrkDTO: SocialNetworkDTO,
    associationId: string,
  ): Promise<ValidationResponse<SocialNetwork>>;
  getSocialNetworkById(id: string): Promise<SocialNetwork>;
  updateSocialNetwork(
    id: string,
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<ValidationResponse<SocialNetwork>>;
  deleteSocialNetwork(id: string): Promise<void>;
}

const ISocialNetworkService = Symbol('ISocialNetworkService');

export default ISocialNetworkService;
