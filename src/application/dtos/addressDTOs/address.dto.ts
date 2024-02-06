import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

class AddressDTO {
  @AutoMap()
  @ApiProperty()
  public addressSite: string;

  @AutoMap()
  @ApiProperty()
  public number: string;

  @AutoMap()
  @ApiProperty()
  public complement: string | null;

  @AutoMap()
  @ApiProperty()
  public district: string;

  @AutoMap()
  @ApiProperty()
  public city: string;

  @AutoMap()
  @ApiProperty()
  public state: string;

  @AutoMap()
  @ApiProperty()
  public country: string;

  @AutoMap()
  @ApiProperty()
  public zipCode: string;
}

export default AddressDTO;
