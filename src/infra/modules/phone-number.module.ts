import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import PhoneNumberController from '../controllers/phone-number.controller';
import PhoneNumberService from 'src/application/useCases/services/phone-number.service';
import PhoneNumberRepository from '../repositories/phone-number.repository';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactRepository from '../repositories/contact.repository';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import IPhoneNumberRepository from 'src/domain/repositories/iphone-number.repository';
import IPhoneNumberService from 'src/domain/services/iphone-number.service';
import mapper from 'src/application/mappers/mapper';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber, Contact])],
  controllers: [PhoneNumberController],
  providers: [
    // Services:
    {
      provide: IPhoneNumberService,
      useClass: PhoneNumberService,
    },

    // Repositories:
    {
      provide: IPhoneNumberRepository,
      useClass: PhoneNumberRepository,
    },
    {
      provide: IContactRepository,
      useClass: ContactRepository,
    },

    // Mappers:
    {
      provide: 'IMapper',
      useValue: mapper,
    },
  ],
})
export class PhoneNumberModule {}
