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
import { ContactModule } from './contact.module';
import { SocialNetworkModule } from './social_network.module';
import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';
import MemberMapper from 'src/application/mappers/member.mapper';

@Module({
  imports: [
    EventModule,
    PhoneNumberModule,
    ContactModule,
    SocialNetworkModule,
    TypeOrmModule.forFeature([
      Association,
      AssociationAddress,
      Event,
      Member,
      PhoneNumber,
      Contact,
      Event,
      SocialNetwork,
    ]),
  ],
  controllers: [AssociationController],
  providers: [
    AssociationService,
    AssociationRepository,
    AssociationMapper,
    AddressMapper,
    MemberMapper,
  ],
})
export class AssociationModule {}
