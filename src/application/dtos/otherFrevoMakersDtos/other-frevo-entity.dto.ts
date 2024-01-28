import { AutoMap } from '@automapper/classes';
import AddressDTO from '../addressDTOs/address.dto';
import { ApiProperty } from '@nestjs/swagger';

class OtherFrevoEntityDTO {
  @AutoMap()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @ApiProperty()
  public address: AddressDTO;

  @AutoMap()
  @ApiProperty()
  public type: string;

  @AutoMap()
  @ApiProperty()
  public entityHistoryNotes: string;

  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;
}

export default OtherFrevoEntityDTO;
