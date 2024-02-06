import { AutoMap } from '@automapper/classes';
import PhoneNumberDTO from './phone-number.dto';
import { ApiProperty } from '@nestjs/swagger';

class ContactDTO {
  @AutoMap()
  @ApiProperty()
  public addressTo: string;

  @AutoMap()
  @ApiProperty()
  public email: string;

  @AutoMap()
  @ApiProperty({ type: [PhoneNumberDTO] })
  public phoneNumbers: Array<PhoneNumberDTO>;
}

export default ContactDTO;
