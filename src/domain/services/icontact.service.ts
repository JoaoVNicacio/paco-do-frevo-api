import Contact from '../entities/associationAggregate/contact.entity';

interface IContactService {
  createContact(association: Contact): Promise<Contact>;
  getById(id: string): Promise<Contact | undefined>;
  updateContact(id: string, contact: Contact): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<void>;
}

export default IContactService;
