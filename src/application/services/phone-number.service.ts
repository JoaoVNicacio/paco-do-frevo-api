import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import IPhoneNumberRepository from 'src/domain/repositories/iphone-number.repository';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import IPhoneNumberService from '../contracts/services/iphone-number.service';

@Injectable()
class PhoneNumberService implements IPhoneNumberService {
  constructor(
    @Inject(IPhoneNumberRepository)
    private readonly _phoneNumberRepository: IPhoneNumberRepository,

    @Inject(IContactRepository)
    private readonly _contactRepository: IContactRepository,

    @Inject(Mapper)
    private readonly _mapper: IMapper,

    @Inject(CacheManager)
    private readonly _cacheManager: Cache,

    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  public async createEntry(
    phoneNumberDTO: PhoneNumberDTO,
    contactId: string,
  ): Promise<ValidationResponse<PhoneNumber>> {
    const phoneNumber = this._mapper.map(
      phoneNumberDTO,
      PhoneNumberDTO,
      PhoneNumber,
    );

    const contact = await this._contactRepository.getById(contactId);

    if (!contact) {
      this._logger.log(
        `<⛔️> ➤ The phone number for the contact ${contactId} didn't pass validation.`,
      );

      const error = new ValidationError();
      error.constraints = { notFound: 'The contact does not exists' };
      error.property = 'contactId';
      error.children = [];

      return new ValidationResponse(phoneNumber, [error]);
    }

    phoneNumber.contact = contact;

    const isValid = await phoneNumber.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The phone number for the contact ${contactId} didn't pass validation.`,
      );

      return new ValidationResponse(
        phoneNumber,
        await phoneNumber.validateCreation(),
      );
    }

    const insertResponse =
      await this._phoneNumberRepository.createPhoneNumber(phoneNumber);

    this._logger.log(
      `<💾> ➤ Created the phone number with id: ${insertResponse.id} and related objects.`,
    );

    return new ValidationResponse(
      insertResponse,
      await phoneNumber.validateCreation(),
    );
  }

  public async getById(id: string): Promise<PhoneNumber> {
    return this._phoneNumberRepository.getById(id);
  }

  public async updateEntryById(
    id: string,
    phoneNumberDTO: PhoneNumberDTO,
  ): Promise<ValidationResponse<PhoneNumber>> {
    const phoneNumber = this._mapper.map(
      phoneNumberDTO,
      PhoneNumberDTO,
      PhoneNumber,
    );

    const isValid = await phoneNumber.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The update for the phone number ${id} didn't pass validation.`,
      );

      return new ValidationResponse(
        phoneNumber,
        await phoneNumber.validateCreation(),
      );
    }

    const updateResponse = await this._phoneNumberRepository.updatePhoneNumber(
      id,
      phoneNumber,
    );

    this._logger.log(`<🔁> ➤ Updated the phone number with id: ${id}.`);

    await this._cacheManager.del(`phone-numbers/id/${id}`);

    this._logger.log(
      `<🗑️> ➤ Deleted cache entries from the phone number with id: ${id} due to update.`,
    );

    return new ValidationResponse(
      updateResponse,
      await phoneNumber.validateCreation(),
    );
  }

  public async deleteEntryById(id: string): Promise<void> {
    await Promise.all([
      this._phoneNumberRepository.deletePhoneNumber(id),
      async () => await this._cacheManager.del(`phone-numbers/id/${id}`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted phone number with id: ${id} from the DB and cache entries.`,
    );
  }
}

export default PhoneNumberService;
