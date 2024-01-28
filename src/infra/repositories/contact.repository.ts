import { InjectRepository as InjectContext } from '@nestjs/typeorm';
import { Repository as DBContext } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import IContactRepository from 'src/domain/repositories/icontact.repository';

@Injectable()
class ContactRepository implements IContactRepository {
  constructor(
    @InjectContext(Contact)
    private readonly _contactContext: DBContext<Contact>,
  ) {}

  public async createContact(contact: Contact): Promise<Contact> {
    const createdContact = this._contactContext.create(contact);
    return await this._contactContext.save(createdContact);
  }

  public async getAll(): Promise<Array<Contact>> {
    return this._contactContext.find();
  }

  public async getPagedContacts(
    page: number,
    pageSize: number,
  ): Promise<{ contacts: Array<Contact>; total: number }> {
    const queryBuilder = this._contactContext.createQueryBuilder('contact');

    const [contacts, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { contacts, total };
  }

  public async getById(id: string): Promise<Contact> {
    return this._contactContext.findOne({
      where: { id },
    });
  }

  public async updateContact(id: string, contact: Contact): Promise<Contact> {
    const existingContact = await this.getById(id);

    if (!existingContact) {
      throw new Error('Contato não encontrado.');
    }

    this._contactContext.merge(existingContact, contact);

    return this._contactContext.save(existingContact);
  }

  public async deleteContact(id: string): Promise<void> {
    const result = await this._contactContext.delete(id);

    if (result.affected === 0) {
      throw new Error('Contato não encontrado.');
    }
  }
}

export default ContactRepository;
