import { AutoMap } from '@automapper/classes';
import PhoneNumberDTO from './phone-number.dto';

class ContactDTO {
  @AutoMap()
  public addressTo: string;
  @AutoMap()
  public email: string;
  @AutoMap()
  public phoneNumbers: Array<PhoneNumberDTO>;
}

export default ContactDTO;
