import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository as InjectDBAccessor } from '@nestjs/typeorm';
import PhoneNumber from 'src/domain/aggregates/associationAggregate/phone-number.entity';
import IPhoneNumberRepository from 'src/domain/repositories/iphone-number.repository';
import { Repository as DBAccessor } from 'typeorm';
import PhoneNumberDBSchema from '../schemas/associationAggregate/phone-number.schema';

@Injectable()
class PhoneNumberRepository implements IPhoneNumberRepository {
  constructor(
    @InjectDBAccessor(PhoneNumberDBSchema)
    private readonly _phoneNumberDBAccessor: DBAccessor<PhoneNumberDBSchema>,
  ) {}

  public async createPhoneNumber(
    phoneNumber: PhoneNumber,
  ): Promise<PhoneNumber> {
    const createdPhoneNumber = this._phoneNumberDBAccessor.create(phoneNumber);

    return await this._phoneNumberDBAccessor.save(createdPhoneNumber);
  }

  public async getAll(): Promise<Array<PhoneNumber>> {
    return await this._phoneNumberDBAccessor.find();
  }

  public async getById(id: string): Promise<PhoneNumber> {
    return await this._phoneNumberDBAccessor.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  public async updatePhoneNumber(
    id: string,
    phoneNumber: PhoneNumber,
  ): Promise<PhoneNumber> {
    const existingPhoneNumber = await this.getById(id);

    if (!existingPhoneNumber)
      throw new NotFoundException('Número de telefone não encontrado.');

    this._phoneNumberDBAccessor.merge(
      PhoneNumberDBSchema.fromDomainEntity(existingPhoneNumber),
      phoneNumber,
    );

    return await this._phoneNumberDBAccessor.save(existingPhoneNumber);
  }

  public async deletePhoneNumber(id: string): Promise<void> {
    const result = await this._phoneNumberDBAccessor.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Número de telefone não encontrado.');
  }
}

export default PhoneNumberRepository;
