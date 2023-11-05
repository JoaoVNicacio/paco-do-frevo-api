import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import AssociationService from 'src/application/useCases/services/association.service';
import AssociationController from '../controllers/association.controller';
import AssociationRepository from '../repositories/association.repository';
import AssociationMapper from 'src/application/mappers/association.mapper';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import Member from 'src/domain/entities/associationAggregate/member.entity';
import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import { EventModule } from './event.module';
import { PhoneNumberModule } from './phoneNumber.module';
import AddressMapper from 'src/application/mappers/address.mapper';

@Module({
  imports: [
    EventModule,
    PhoneNumberModule,
    TypeOrmModule.forFeature([
      Association,
      AssociationAddress,
      Event,
      Member,
      PhoneNumber,
      Contact,
      Event,
    ]),
  ],
  controllers: [AssociationController],
  providers: [
    AssociationService,
    AssociationRepository,
    AssociationMapper,
    AddressMapper,
  ],
})
export class AssociationModule {}
