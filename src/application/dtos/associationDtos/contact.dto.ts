import PhoneNumberDTO from './phoneNumber.dto';

class ContactDTO {
  public addressTo: string;
  public email: string;
  public phoneNumbers: Array<PhoneNumberDTO>;
}

export default ContactDTO;
