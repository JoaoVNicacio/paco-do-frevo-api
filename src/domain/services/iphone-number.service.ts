import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import PhoneNumber from '../entities/associationAggregate/phone-number.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';

interface IPhoneNumberService {
  createPhoneNumber(
    phoneNumberDTO: PhoneNumberDTO,
    contactId: string,
  ): Promise<ValidationResponse<PhoneNumber>>;
  getPhoneNumberById(id: string): Promise<PhoneNumber>;
  updatePhoneNumber(
    id: string,
    phoneNumberDTO: PhoneNumberDTO,
  ): Promise<ValidationResponse<PhoneNumber>>;
  deletePhoneNumber(id: string): Promise<void>;
}

const IPhoneNumberService = Symbol('IPhoneNumberService');

export default IPhoneNumberService;
