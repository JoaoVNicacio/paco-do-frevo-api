import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import ICreateEntryForRootAsyncUseCase from 'src/application/useCases/generics/I-create-for-root.use-case';
import IDeleteEntryAsyncUseCase from 'src/application/useCases/generics/delete-entry.use-case';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import IUpdateEntryAsyncUseCase from 'src/application/useCases/generics/iupdate-entry.use-case';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';

interface IContactService
  extends IGetByIdAsyncUseCase<Contact, string>,
    ICreateEntryForRootAsyncUseCase<Contact, ContactDTO, string>,
    IUpdateEntryAsyncUseCase<Contact, ContactDTO, string>,
    IDeleteEntryAsyncUseCase<string> {
  createEntry(
    contactDTO: ContactDTO,
    associationId: string,
  ): Promise<ValidationResponse<Contact>>;
  getById(id: string): Promise<Contact>;
  updateEntryById(
    id: string,
    contactDTO: ContactDTO,
  ): Promise<ValidationResponse<Contact>>;
  deleteEntryById(id: string): Promise<void>;
}

const IContactService = Symbol('IContactService');

export default IContactService;
