import PhoneNumber from '../entities/associationAggregate/phone-number.entity';

interface IPhoneNumberRepository {
  createResume(phoneNumber: PhoneNumber): Promise<PhoneNumber>;
  getAll(): Promise<Array<PhoneNumber> | any>;
  getById(id: string): Promise<PhoneNumber | undefined>;
  updatePhoneNumber(
    id: string,
    phoneNumber: PhoneNumber,
  ): Promise<PhoneNumber | undefined>;
  deletePhoneNumber(id: string): Promise<void>;
}

export default IPhoneNumberRepository;
