import PhoneNumber from '../aggregates/associationAggregate/phone-number.entity';

interface IPhoneNumberRepository {
  createPhoneNumber(phoneNumber: PhoneNumber): Promise<PhoneNumber>;
  getAll(): Promise<Array<PhoneNumber> | any>;
  getById(id: string): Promise<PhoneNumber | undefined>;
  updatePhoneNumber(
    id: string,
    phoneNumber: PhoneNumber,
  ): Promise<PhoneNumber | undefined>;
  deletePhoneNumber(id: string): Promise<void>;
}

const IPhoneNumberRepository = Symbol('IPhoneNumberRepository');

export default IPhoneNumberRepository;
