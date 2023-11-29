import { Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import PhoneNumberMapper from 'src/application/mappers/phone-number.mapper';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import IPhoneNumberService from 'src/domain/services/iphone-number.service';
import ContactRepository from 'src/infra/repositories/contact.repository';
import PhoneNumberRepository from 'src/infra/repositories/phone-number.repository';

@Injectable()
class PhoneNumberService implements IPhoneNumberService {
  constructor(
    private readonly _phoneNumberRepository: PhoneNumberRepository,
    private readonly _contactRepository: ContactRepository,
    private readonly _phoneNumberMapper: PhoneNumberMapper,
  ) {}

  public async createPhoneNumber(
    phoneNumberDTO: PhoneNumberDTO,
    contactId: string,
  ): Promise<ValidationResponse<PhoneNumber>> {
    const phoneNumber = this._phoneNumberMapper.dtoToEntity(phoneNumberDTO);

    const contact = await this._contactRepository.getById(contactId);

    if (!contact) {
      const error = new ValidationError();
      error.constraints = { contactId: 'The association does not exists' };

      return new ValidationResponse(phoneNumber, [error], false);
    }

    phoneNumber.contact = contact;

    const isValid = await phoneNumber.isValid();

    if (!isValid) {
      return new ValidationResponse(
        phoneNumber,
        await phoneNumber.validateCreation(),
        isValid,
      );
    }

    const insertResponse =
      await this._phoneNumberRepository.createPhoneNumber(phoneNumber);

    return new ValidationResponse(
      insertResponse,
      await phoneNumber.validateCreation(),
      isValid,
    );
  }

  public async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    return await this._phoneNumberRepository.getAll();
  }

  public async getPhoneNumberById(id: string): Promise<PhoneNumber> {
    return this._phoneNumberRepository.getById(id);
  }

  public async updatePhoneNumber(
    id: string,
    phoneNumberDTO: PhoneNumberDTO,
  ): Promise<ValidationResponse<PhoneNumber>> {
    const phoneNumber = this._phoneNumberMapper.dtoToEntity(phoneNumberDTO);

    const isValid = await phoneNumber.isValid();

    if (!isValid) {
      return new ValidationResponse(
        phoneNumber,
        await phoneNumber.validateCreation(),
        isValid,
      );
    }

    const updateResponse = await this._phoneNumberRepository.updatePhoneNumber(
      id,
      phoneNumber,
    );

    return new ValidationResponse(
      updateResponse,
      await phoneNumber.validateCreation(),
      isValid,
    );
  }

  public async deletePhoneNumber(id: string): Promise<void> {
    return await this._phoneNumberRepository.deletePhoneNumber(id);
  }
}

export default PhoneNumberService;
