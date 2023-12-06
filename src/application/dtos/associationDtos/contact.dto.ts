import PhoneNumberDTO from './phone-number.dto';

class ContactDTO {
  public addressTo: string;
  public email: string;
  public phoneNumbers: Array<PhoneNumberDTO>;
}

export default ContactDTO;
