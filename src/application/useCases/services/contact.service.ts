import { Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ContactMapper from 'src/application/mappers/contact.mapper';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import IContactService from 'src/domain/services/icontact.service';
import AssociationRepository from 'src/infra/repositories/association.repository';
import ContactRepository from 'src/infra/repositories/contact.repository';

@Injectable()
class ContactService implements IContactService {
  constructor(
    private readonly _contactRepository: ContactRepository,
    private readonly _associationRepository: AssociationRepository,
    private readonly _contactMapper: ContactMapper,
  ) {}

  public async createContact(
    contactDTO: ContactDTO,
    associationId: string,
  ): Promise<ValidationResponse<Contact>> {
    const contact = this._contactMapper.dtoToEntity(contactDTO);
    const association =
      await this._associationRepository.getById(associationId);

    if (!association) {
      const error = new ValidationError();
      error.constraints = { associationId: 'The association does not exists' };

      return new ValidationResponse(contact, [error], false);
    }

    contact.association = association;

    const isValid = await contact.isValid();

    if (!isValid) {
      return new ValidationResponse(
        contact,
        await contact.validateCreation(),
        isValid,
      );
    }

    const insertResponse = await this._contactRepository.createContact(contact);

    return new ValidationResponse(
      insertResponse,
      await contact.validateCreation(),
      isValid,
    );
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
  ): Promise<ValidationResponse<Contact>> {
    const contact = this._contactMapper.dtoToEntity(contactDTO);
    const isValid = await contact.isValid();

    if (!isValid) {
      return new ValidationResponse(
        contact,
        await contact.validateCreation(),
        isValid,
      );
    }

    const updateResponse = await this._contactRepository.updateContact(
      id,
      contact,
    );

    return new ValidationResponse(
      updateResponse,
      await contact.validateCreation(),
      isValid,
    );
  }

  public async deleteContact(id: string): Promise<void> {
    return await this._contactRepository.deleteContact(id);
  }
}

export default ContactService;
