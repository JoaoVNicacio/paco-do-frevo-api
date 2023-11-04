import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';

@Injectable()
class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async createContact(contactDTO: ContactDTO): Promise<Contact> {
    const contact = this.contactRepository.create(contactDTO);
    return await this.contactRepository.save(contact);
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async getContactById(id: string): Promise<Contact> {
    return await this.contactRepository.findOne(id);
  }

  async updateContact(id: string, contactDTO: ContactDTO): Promise<Contact> {
    await this.contactRepository.update(id, contactDTO);
    return await this.contactRepository.findOne(id);
  }

  async deleteContact(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }
}

export default ContactService;
