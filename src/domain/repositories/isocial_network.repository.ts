import SocialNetwork from '../entities/associationAggregate/social_network.entity';

interface ISocialNetworkRepository {
  createResume(social_network: SocialNetwork): Promise<SocialNetwork>;
  getAll(): Promise<Array<SocialNetwork> | any>;
  getById(id: string): Promise<SocialNetwork | undefined>;
  updateAssociation(
    id: string,
    social_network: SocialNetwork,
  ): Promise<SocialNetwork | undefined>;
  deleteAssociation(id: string): Promise<void>;
}

export default ISocialNetworkRepository;
