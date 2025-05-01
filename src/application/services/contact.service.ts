import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ValidationResponse from 'src/shared/responseObjects/validation.response';
import Contact from 'src/domain/aggregates/associationAggregate/contact.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import { Mapper as IMapper } from '@automapper/core';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import IContactService from '../contracts/services/icontact.service';
import ContactValidator from '../validation/contact.validator';

@Injectable()
class ContactService implements IContactService {
  constructor(
    @Inject(IContactRepository)
    private readonly _contactRepository: IContactRepository,

    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,

    @Inject(Mapper)
    private readonly _mapper: IMapper,

    @Inject(CacheManager)
    private readonly _cacheManager: Cache,

    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  public async createEntry(
    contactDTO: ContactDTO,
    associationId: string,
  ): Promise<ValidationResponse<Contact>> {
    const contact = this._mapper.map(contactDTO, ContactDTO, Contact);

    const association =
      await this._associationRepository.getById(associationId);

    if (!association) {
      this._logger.log(
        `<⛔️> ➤ The Contact: ${contactDTO.addressTo} didn't pass validation.`,
      );

      const error = new ValidationError();
      error.constraints = { notFound: 'The association does not exists' };
      error.property = 'associationId';
      error.children = [];

      return new ValidationResponse(contact, [error]);
    }

    contact.sanitizeEntityProperties();

    contact.association = association;

    contact.validationDelegate = new ContactValidator().validate.bind(
      new ContactValidator(),
    );

    const isValid = await contact.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The Contact: ${contactDTO.addressTo} didn't pass validation.`,
      );

      return new ValidationResponse(contact, await contact.validateEntity());
    }

    const insertResponse = await this._contactRepository.createContact(contact);

    this._logger.log(
      `<💾> ➤ Created the contact with id: ${insertResponse.id} and related objects.`,
    );

    return new ValidationResponse(
      insertResponse,
      await contact.validateEntity(),
    );
  }

  public async getById(id: string): Promise<Contact> {
    return this._contactRepository.getById(id);
  }

  public async updateEntryById(
    id: string,
    contactDTO: ContactDTO,
  ): Promise<ValidationResponse<Contact>> {
    const contact = this._mapper.map(contactDTO, ContactDTO, Contact);

    contact.sanitizeEntityProperties();

    contact.validationDelegate = new ContactValidator().validate.bind(
      new ContactValidator(),
    );

    const isValid = await contact.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The update for the contact ${id} didn't pass validation.`,
      );

      return new ValidationResponse(contact, await contact.validateEntity());
    }

    const updateResponse = await this._contactRepository.updateContact(
      id,
      contact,
    );

    this._logger.log(
      `<🔁> ➤ Updated the Contact with id: ${id} and related objects.`,
    );

    return new ValidationResponse(
      updateResponse,
      await contact.validateEntity(),
    );
  }

  public async deleteEntryById(id: string): Promise<void> {
    await Promise.all([
      this._contactRepository.deleteContact(id),
      this._cacheManager.del(`contacts/id/${id}`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted Contact with id: ${id} from the DB and cache entries.`,
    );
  }
}

export default ContactService;
