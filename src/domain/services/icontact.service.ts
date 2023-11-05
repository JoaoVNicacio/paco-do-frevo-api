import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';

interface IContactService {
  createContact(contactDTO: ContactDTO): Promise<Contact>;
  getAllContacts(): Promise<Array<Contact>>;
  getContactById(id: string): Promise<Contact>;
  updateContact(id: string, contactDTO: ContactDTO): Promise<Contact>;
  deleteContact(id: string): Promise<void>;
}

export default IContactService;
