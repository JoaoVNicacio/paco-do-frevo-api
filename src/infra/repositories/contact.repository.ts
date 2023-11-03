import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import { Repository } from 'typeorm';

@Injectable()
class ContactRepository implements IContactRepository {
  constructor(
    @InjectRepository(Contact)
    private _contactRepository: Repository<Contact>,
  ) {}

  public async createContact(contact: Contact): Promise<Contact> {
    const createdContact = this._contactRepository.create(contact);

    return await this._contactRepository.save(createdContact);
  }

  public async getById(id: string): Promise<Contact> {
    return await this._contactRepository.findOne({
      where: { id },
    });
  }

  public async updateContact(id: string, contact: Contact): Promise<Contact> {
    const existingContact = await this.getById(id);

    if (!existingContact) {
      throw new Error('Associação não encontrada.');
    }

    this._contactRepository.merge(existingContact, contact);

    return await this._contactRepository.save(existingContact);
  }

  public async deleteContact(id: string): Promise<void> {
    const result = await this._contactRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Associação não encontrada.');
    }
  }
}

export default ContactRepository;
