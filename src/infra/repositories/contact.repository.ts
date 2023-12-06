import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import IContactRepository from 'src/domain/repositories/icontact.repository';

@Injectable()
class ContactRepository implements IContactRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly _contactRepository: Repository<Contact>,
  ) {}

  public async createContact(contact: Contact): Promise<Contact> {
    const createdContact = this._contactRepository.create(contact);
    return await this._contactRepository.save(createdContact);
  }

  public async getAll(): Promise<Array<Contact>> {
    return this._contactRepository.find();
  }

  public async getPagedContacts(
    page: number,
    pageSize: number,
  ): Promise<{ contacts: Array<Contact>; total: number }> {
    const queryBuilder = this._contactRepository.createQueryBuilder('contact');

    const [contacts, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { contacts, total };
  }

  public async getById(id: string): Promise<Contact> {
    return this._contactRepository.findOne({
      where: { id },
    });
  }

  public async updateContact(id: string, contact: Contact): Promise<Contact> {
    const existingContact = await this.getById(id);

    if (!existingContact) {
      throw new Error('Contato não encontrado.');
    }

    this._contactRepository.merge(existingContact, contact);

    return this._contactRepository.save(existingContact);
  }

  public async deleteContact(id: string): Promise<void> {
    const result = await this._contactRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Contato não encontrado.');
    }
  }
}

export default ContactRepository;
