import PhoneNumberDTO from 'src/application/dtos/associationDtos/phoneNumber.dto';
import PhoneNumber from '../entities/associationAggregate/phoneNumber.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';

interface IPhoneNumberService {
  createPhoneNumber(
    phoneNumberDTO: PhoneNumberDTO,
    contactId: string,
  ): Promise<ValidationResponse<PhoneNumber>>;
  getAllPhoneNumbers(): Promise<Array<PhoneNumber>>;
  getPhoneNumberById(id: string): Promise<PhoneNumber>;
  updatePhoneNumber(
    id: string,
    phoneNumberDTO: PhoneNumberDTO,
  ): Promise<ValidationResponse<PhoneNumber>>;
  deletePhoneNumber(id: string): Promise<void>;
}

export default IPhoneNumberService;
