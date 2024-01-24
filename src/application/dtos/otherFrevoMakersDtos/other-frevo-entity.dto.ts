import { AutoMap } from '@automapper/classes';
import AddressDTO from '../addressDTOs/address.dto';

class OtherFrevoEntityDTO {
  @AutoMap()
  public name: string;
  @AutoMap()
  public address: AddressDTO;
  @AutoMap()
  public type: string;
  @AutoMap()
  public entityHistoryNotes: string;
  @AutoMap()
  public actuationTimeInMonths: number;
}

export default OtherFrevoEntityDTO;
