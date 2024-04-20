import SocialNetwork from '../aggregates/associationAggregate/social-network.entity';

interface ISocialNetworkRepository {
  createSocialNetwork(socialNetwork: SocialNetwork): Promise<SocialNetwork>;
  getAll(): Promise<Array<SocialNetwork> | any>;
  getById(id: string): Promise<SocialNetwork | undefined>;
  getPagedSocialNetworks(
    page: number,
    pageSize: number,
  ): Promise<{
    socialNetwork: Array<SocialNetwork>;
    total: number;
  }>;
  updateSocialNetwork(
    id: string,
    socialNetwork: SocialNetwork,
  ): Promise<SocialNetwork | undefined>;
  deleteSocialNetwork(id: string): Promise<void>;
}

const ISocialNetworkRepository = Symbol('ISocialNetworkRepository');

export default ISocialNetworkRepository;
