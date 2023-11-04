import PhoneNumberDTO from 'src/application/dtos/associationDtos/phoneNumber.dto';
import PhoneNumber from '../entities/associationAggregate/phoneNumber.entity';

interface IPhoneNumberService {
  createPhoneNumber(phoneNumberDTO: PhoneNumberDTO): Promise<PhoneNumber>;
  getAllPhoneNumbers(): Promise<Array<PhoneNumber>>;
  getPhoneNumberById(id: string): Promise<PhoneNumber>;
  updatePhoneNumber(
    id: string,
    phoneNumberDTO: PhoneNumberDTO,
  ): Promise<PhoneNumber>;
  deletePhoneNumber(id: string): Promise<void>;
}

export default IPhoneNumberService;
