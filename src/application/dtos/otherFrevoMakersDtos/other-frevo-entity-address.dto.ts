import { AutoMap } from '@automapper/classes';

class OtherFrevoEntityAddressDTO {
  @AutoMap()
  public addressSite: string;
  @AutoMap()
  public number: string;
  @AutoMap()
  public complement: string;
  @AutoMap()
  public district: string;
  @AutoMap()
  public city: string;
  @AutoMap()
  public state: string;
  @AutoMap()
  public country: string;
  @AutoMap()
  public zipCode: string;
}

export default OtherFrevoEntityAddressDTO;
