import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

class SocialNetworkDTO {
  @AutoMap()
  @ApiProperty()
  public socialNetworkType: string;

  @AutoMap()
  @ApiProperty()
  public url: string;
}

export default SocialNetworkDTO;
