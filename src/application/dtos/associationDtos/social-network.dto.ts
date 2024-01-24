import { AutoMap } from '@automapper/classes';

class SocialNetworkDTO {
  @AutoMap()
  public socialNetworkType: string;
  @AutoMap()
  public url: string;
}

export default SocialNetworkDTO;
