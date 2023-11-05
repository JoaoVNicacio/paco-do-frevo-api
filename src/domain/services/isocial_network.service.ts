import SocialNetworkDTO from 'src/application/dtos/associationDtos/social_network.dto';
import SocialNetwork from '../entities/associationAggregate/social_network.entity';

interface ISocialNetowrkService {
  createSocialNetwork(
    socialNetowrkDTO: SocialNetworkDTO,
  ): Promise<SocialNetwork>;
  getAllSocialNetwork(): Promise<Array<SocialNetwork>>;
  getAssociationById(id: string): Promise<SocialNetwork>;
  updateSocialNetwork(
    id: string,
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<SocialNetwork>;
  deleteSocialNetwork(id: string): Promise<void>;
}

export default ISocialNetowrkService;
