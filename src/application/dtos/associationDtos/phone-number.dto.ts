import { AutoMap } from '@automapper/classes';

class PhoneNumberDTO {
  @AutoMap()
  public countryCode: string;
  @AutoMap()
  public areaCode: string;
  @AutoMap()
  public number: string;
}

export default PhoneNumberDTO;
