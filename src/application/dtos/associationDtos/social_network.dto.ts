import Association from 'src/domain/entities/associationAggregate/association.entity';

class SocialNetworkDTO {
  public ESocialNetworkType: string;
  public url: string;
  public createdBy: string;
  public updatedBy: string;
  public association: Association;
}

export default SocialNetworkDTO;
