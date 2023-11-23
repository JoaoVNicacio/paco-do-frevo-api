import SocialNetworkDTO from 'src/application/dtos/associationDtos/social_network.dto';
import SocialNetwork from '../entities/associationAggregate/social_network.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';

interface ISocialNetworkService {
  createSocialNetwork(
    socialNetowrkDTO: SocialNetworkDTO,
    associationId: string,
  ): Promise<ValidationResponse<SocialNetwork>>;
  getAllSocialNetwork(): Promise<Array<SocialNetwork>>;
  getSocialNetworkById(id: string): Promise<SocialNetwork>;
  updateSocialNetwork(
    id: string,
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<ValidationResponse<SocialNetwork>>;
  deleteSocialNetwork(id: string): Promise<void>;
}

export default ISocialNetworkService;
