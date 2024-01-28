import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectContext } from '@nestjs/typeorm';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import IPhoneNumberRepository from 'src/domain/repositories/iphone-number.repository';
import { Repository as DBContext } from 'typeorm';

@Injectable()
class PhoneNumberRepository implements IPhoneNumberRepository {
  constructor(
    @InjectContext(PhoneNumber)
    private readonly _phoneNumberContext: DBContext<PhoneNumber>,
  ) {}

  public async createPhoneNumber(
    phoneNumber: PhoneNumber,
  ): Promise<PhoneNumber> {
    const createdPhoneNumber = this._phoneNumberContext.create(phoneNumber);

    return await this._phoneNumberContext.save(createdPhoneNumber);
  }

  public async getAll(): Promise<Array<PhoneNumber>> {
    return await this._phoneNumberContext.find();
  }

  public async getById(id: string): Promise<PhoneNumber> {
    return await this._phoneNumberContext.findOne({
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

    this._phoneNumberContext.merge(existingPhoneNumber, phoneNumber);

    return await this._phoneNumberContext.save(existingPhoneNumber);
  }

  public async deletePhoneNumber(id: string): Promise<void> {
    const result = await this._phoneNumberContext.delete(id);

    if (result.affected === 0) {
      throw new Error('Número de telefone não encontrado.');
    }
  }
}

export default PhoneNumberRepository;
