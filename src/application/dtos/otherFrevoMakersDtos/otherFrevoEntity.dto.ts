import OtherFrevoEntityAddressDTO from './otherFrevoEntityAddress.dto';

class OtherFrevoEntityDTO {
  public name: string;
  public address: OtherFrevoEntityAddressDTO;
  public type: string;
  public entityHistoryNotes: string;
  public actuationTimeInMonths: number;
}

export default OtherFrevoEntityDTO;
