import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import IContactService from 'src/domain/services/icontact.service';
import mapper from 'src/application/mappers/mapper';

@Injectable()
class ContactService implements IContactService {
  constructor(
    @Inject(IContactRepository)
    private readonly _contactRepository: IContactRepository,

    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,
  ) {}

  public async createContact(
    contactDTO: ContactDTO,
    associationId: string,
  ): Promise<ValidationResponse<Contact>> {
    const contact = mapper.map(contactDTO, ContactDTO, Contact);

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
    const contact = mapper.map(contactDTO, ContactDTO, Contact);

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
