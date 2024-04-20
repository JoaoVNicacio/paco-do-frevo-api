import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import ICreateEntryForRootAsyncUseCase from 'src/application/useCases/generics/icreate-for-root.use-case';
import IDeleteEntryAsyncUseCase from 'src/application/useCases/generics/idelete-entry.use-case';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import IUpdateEntryAsyncUseCase from 'src/application/useCases/generics/iupdate-entry.use-case';
import PhoneNumber from 'src/domain/aggregates/associationAggregate/phone-number.entity';

interface IPhoneNumberService
  extends IGetByIdAsyncUseCase<PhoneNumber, string>,
    ICreateEntryForRootAsyncUseCase<PhoneNumber, PhoneNumberDTO, string>,
    IUpdateEntryAsyncUseCase<PhoneNumber, PhoneNumberDTO, string>,
    IDeleteEntryAsyncUseCase<string> {
  createEntry(
    phoneNumberDTO: PhoneNumberDTO,
    contactId: string,
  ): Promise<ValidationResponse<PhoneNumber>>;
  getById(id: string): Promise<PhoneNumber>;
  updateEntryById(
    id: string,
    phoneNumberDTO: PhoneNumberDTO,
  ): Promise<ValidationResponse<PhoneNumber>>;
  deleteEntryById(id: string): Promise<void>;
}

const IPhoneNumberService = Symbol('IPhoneNumberService');

export default IPhoneNumberService;
