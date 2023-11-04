import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';
import PhoneNumberController from '../controllers/phoneNumber.controller';
import PhoneNumberService from 'src/application/useCases/services/phoneNumber.service';
import PhoneNumberMapper from 'src/application/mappers/phoneNumber.mapper';
import PhoneNumberRepository from '../repositories/phoneNumber.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber])],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService, PhoneNumberRepository, PhoneNumberMapper],
})
export class PhoneNumberModule {}
