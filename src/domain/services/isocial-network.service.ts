import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetwork from '../entities/associationAggregate/social-network.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';

interface ISocialNetworkService {
  createSocialNetwork(
    socialNetowrkDTO: SocialNetworkDTO,
    associationId: string,
  ): Promise<ValidationResponse<SocialNetwork>>;
  getAllSocialNetworks(): Promise<Array<SocialNetwork>>;
  getSocialNetworkById(id: string): Promise<SocialNetwork>;
  updateSocialNetwork(
    id: string,
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<ValidationResponse<SocialNetwork>>;
  deleteSocialNetwork(id: string): Promise<void>;
}

const ISocialNetworkService = Symbol('ISocialNetworkService');

export default ISocialNetworkService;
