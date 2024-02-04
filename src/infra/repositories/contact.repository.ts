import { InjectRepository as InjectDBAccessor } from '@nestjs/typeorm';
import { Repository as DBAccessor } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import IContactRepository from 'src/domain/repositories/icontact.repository';

@Injectable()
class ContactRepository implements IContactRepository {
  constructor(
    @InjectDBAccessor(Contact)
    private readonly _contactDBAccessor: DBAccessor<Contact>,
  ) {}

  public async createContact(contact: Contact): Promise<Contact> {
    const createdContact = this._contactDBAccessor.create(contact);
    return await this._contactDBAccessor.save(createdContact);
  }

  public async getAll(): Promise<Array<Contact>> {
    return this._contactDBAccessor.find();
  }

  public async getPagedContacts(
    page: number,
    pageSize: number,
  ): Promise<{ contacts: Array<Contact>; total: number }> {
    const queryBuilder = this._contactDBAccessor.createQueryBuilder('contact');

    const [contacts, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { contacts, total };
  }

  public async getById(id: string): Promise<Contact> {
    return this._contactDBAccessor.findOne({
      where: { id },
    });
  }

  public async updateContact(id: string, contact: Contact): Promise<Contact> {
    const existingContact = await this.getById(id);

    if (!existingContact) {
      throw new NotFoundException('Contato não encontrado.');
    }

    this._contactDBAccessor.merge(existingContact, contact);

    return this._contactDBAccessor.save(existingContact);
  }

  public async deleteContact(id: string): Promise<void> {
    const result = await this._contactDBAccessor.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Contato não encontrado.');
    }
  }
}

export default ContactRepository;
