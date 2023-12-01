import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import PhoneNumberController from '../controllers/phone-number.controller';
import PhoneNumberService from 'src/application/useCases/services/phone-number.service';
import PhoneNumberMapper from 'src/application/mappers/phone-number.mapper';
import PhoneNumberRepository from '../repositories/phone-number.repository';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactRepository from '../repositories/contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber, Contact])],
  controllers: [PhoneNumberController],
  providers: [
    PhoneNumberService,
    PhoneNumberRepository,
    ContactRepository,
    PhoneNumberMapper,
  ],
})
export class PhoneNumberModule {}
