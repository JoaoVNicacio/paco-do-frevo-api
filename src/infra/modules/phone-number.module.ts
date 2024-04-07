import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import PhoneNumberService from 'src/application/services/phone-number.service';
import PhoneNumberRepository from '../repositories/phone-number.repository';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactRepository from '../repositories/contact.repository';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import IPhoneNumberRepository from 'src/domain/repositories/iphone-number.repository';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManager } from '@nestjs/cache-manager';
import IPhoneNumberService from 'src/application/contracts/services/iphone-number.service';
import mapper from 'src/application/mapping/mapper';
import PhoneNumberController from 'src/api/controllers/phone-number.controller';

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
      provide: Mapper,
      useValue: mapper,
    },

    // CacheManager:
    {
      provide: CacheManager,
      useExisting: cacheManager,
    },

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
    },
  ],
})
export class PhoneNumberModule {}
