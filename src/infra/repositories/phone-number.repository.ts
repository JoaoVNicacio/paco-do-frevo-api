import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import IPhoneNumberRepository from 'src/domain/repositories/iphone-number.repository';
import { Repository } from 'typeorm';

@Injectable()
class PhoneNumberRepository implements IPhoneNumberRepository {
  constructor(
    @InjectRepository(PhoneNumber)
    private _phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  public async createResume(phoneNumber: PhoneNumber): Promise<PhoneNumber> {
    const createdPhoneNumber = this._phoneNumberRepository.create(phoneNumber);

    return await this._phoneNumberRepository.save(createdPhoneNumber);
  }

  public async getAll(): Promise<Array<PhoneNumber>> {
    return await this._phoneNumberRepository.find();
  }

  public async getById(id: string): Promise<PhoneNumber> {
    return await this._phoneNumberRepository.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  public async updatePhoneNumber(
    id: string,
    phoneNumber: PhoneNumber,
  ): Promise<PhoneNumber> {
    const existingPhoneNumber = await this.getById(id);

    if (!existingPhoneNumber) {
      throw new Error('Número de telefone não encontrado.');
    }

    this._phoneNumberRepository.merge(existingPhoneNumber, phoneNumber);

    return await this._phoneNumberRepository.save(existingPhoneNumber);
  }

  public async deletePhoneNumber(id: string): Promise<void> {
    const result = await this._phoneNumberRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Número de telefone não encontrado.');
    }
  }
}

export default PhoneNumberRepository;
