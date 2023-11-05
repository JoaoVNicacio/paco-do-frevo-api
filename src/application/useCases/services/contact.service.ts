import { Injectable } from '@nestjs/common';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ContactMapper from 'src/application/mappers/contact.mapper';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import IContactService from 'src/domain/services/icontact.service';
import ContactRepository from 'src/infra/repositories/contact.repository';

@Injectable()
class ContactService implements IContactService {
  constructor(
    private readonly _contactRepository: ContactRepository,
    private readonly _contactMapper: ContactMapper,
  ) {}

  public async createContact(contactDTO: ContactDTO): Promise<Contact> {
    const contact = this._contactMapper.dtoToEntity(contactDTO);

    return this._contactRepository.createContact(contact);
  }

  public async getAllContacts(): Promise<Array<Contact>> {
    return await this._contactRepository.getAll();
  }

  public async getContactById(id: string): Promise<Contact> {
    return this._contactRepository.getById(id);
  }

  public async updateContact(
    id: string,
    contactDTO: ContactDTO,
  ): Promise<Contact> {
    const contact = this._contactMapper.dtoToEntity(contactDTO);

    return await this._contactRepository.updateContact(id, contact);
  }

  public async deleteContact(id: string): Promise<void> {
    return await this._contactRepository.deleteContact(id);
  }
}

export default ContactService;
