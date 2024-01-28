import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

class PhoneNumberDTO {
  @AutoMap()
  @ApiProperty()
  public countryCode: string;

  @AutoMap()
  @ApiProperty()
  public areaCode: string;

  @AutoMap()
  @ApiProperty()
  public number: string;
}

export default PhoneNumberDTO;
