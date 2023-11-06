import { Injectable } from '@nestjs/common';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phoneNumber.dto';
import PhoneNumberMapper from 'src/application/mappers/phoneNumber.mapper';
import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';
import IPhoneNumberService from 'src/domain/services/iphoneNumber.service';
import PhoneNumberRepository from 'src/infra/repositories/phoneNumber.repository';

@Injectable()
class PhoneNumberService implements IPhoneNumberService {
  constructor(
    private readonly _phoneNumberRepository: PhoneNumberRepository,
    private readonly _phoneNumberMapper: PhoneNumberMapper,
  ) {}

  public async createPhoneNumber(
    phoneNumberDTO: PhoneNumberDTO,
  ): Promise<PhoneNumber> {
    const phoneNumber = this._phoneNumberMapper.dtoToEntity(phoneNumberDTO);

    return this._phoneNumberRepository.createResume(phoneNumber);
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
  ): Promise<PhoneNumber> {
    const phoneNumber = this._phoneNumberMapper.dtoToEntity(phoneNumberDTO);

    return await this._phoneNumberRepository.updatePhoneNumber(id, phoneNumber);
  }

  public async deletePhoneNumber(id: string): Promise<void> {
    return await this._phoneNumberRepository.deletePhoneNumber(id);
  }
}

export default PhoneNumberService;
