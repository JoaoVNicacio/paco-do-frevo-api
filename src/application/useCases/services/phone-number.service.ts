import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import IPhoneNumberRepository from 'src/domain/repositories/iphone-number.repository';
import IPhoneNumberService from 'src/domain/services/iphone-number.service';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';

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
  ) {}

  public async createPhoneNumber(
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
      const error = new ValidationError();
      error.constraints = { notFound: 'The contact does not exists' };
      error.property = 'contactId';
      error.children = [];

      return new ValidationResponse(phoneNumber, [error]);
    }

    phoneNumber.contact = contact;

    const isValid = await phoneNumber.isValid();

    if (!isValid) {
      return new ValidationResponse(
        phoneNumber,
        await phoneNumber.validateCreation(),
      );
    }

    const insertResponse =
      await this._phoneNumberRepository.createPhoneNumber(phoneNumber);

    return new ValidationResponse(
      insertResponse,
      await phoneNumber.validateCreation(),
    );
  }

  public async getPhoneNumberById(id: string): Promise<PhoneNumber> {
    return this._phoneNumberRepository.getById(id);
  }

  public async updatePhoneNumber(
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
      return new ValidationResponse(
        phoneNumber,
        await phoneNumber.validateCreation(),
      );
    }

    const updateResponse = await this._phoneNumberRepository.updatePhoneNumber(
      id,
      phoneNumber,
    );

    await this._cacheManager.del(`phone-numbers/id/${id}`);

    return new ValidationResponse(
      updateResponse,
      await phoneNumber.validateCreation(),
    );
  }

  public async deletePhoneNumber(id: string): Promise<void> {
    return await this._phoneNumberRepository
      .deletePhoneNumber(id)
      .then(async () => await this._cacheManager.del(`phone-numbers/id/${id}`));
  }
}

export default PhoneNumberService;
