import SocialNetwork from '../entities/associationAggregate/social-network.entity';

interface ISocialNetworkRepository {
  createSocialNetwork(social_network: SocialNetwork): Promise<SocialNetwork>;
  getAll(): Promise<Array<SocialNetwork> | any>;
  getById(id: string): Promise<SocialNetwork | undefined>;
  updateSocialNetwork(
    id: string,
    social_network: SocialNetwork,
  ): Promise<SocialNetwork | undefined>;
  deleteSocialNetwork(id: string): Promise<void>;
}

export default ISocialNetworkRepository;
