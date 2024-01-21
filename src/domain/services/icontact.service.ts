import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';

interface IContactService {
  createContact(
    contactDTO: ContactDTO,
    associationId: string,
  ): Promise<ValidationResponse<Contact>>;
  getAllContacts(): Promise<Array<Contact>>;
  getContactById(id: string): Promise<Contact>;
  updateContact(
    id: string,
    contactDTO: ContactDTO,
  ): Promise<ValidationResponse<Contact>>;
  deleteContact(id: string): Promise<void>;
}

const IContactService = Symbol('IContactService');

export default IContactService;
