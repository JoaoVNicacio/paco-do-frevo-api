import Contact from 'src/domain/entities/associationAggregate/contact.entity';

interface IContactRepository {
  getPagedContacts(page: number, pageSize: number): unknown;
  createContact(contact: Contact): Promise<Contact>;
  getAll(): Promise<Array<Contact> | any>;
  getById(id: string): Promise<Contact | undefined>;
  updateContact(id: string, contact: Contact): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<void>;
}

export default IContactRepository;
