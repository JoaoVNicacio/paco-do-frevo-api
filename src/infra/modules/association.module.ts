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
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import { EventModule } from './event.module';
import { PhoneNumberModule } from './phone-number.module';
import AddressMapper from 'src/application/mappers/address.mapper';
import { ContactModule } from './contact.module';
import { SocialNetworkModule } from './social-network.module';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import MemberMapper from 'src/application/mappers/member.mapper';
import PhoneNumberMapper from 'src/application/mappers/phone-number.mapper';
import ContactMapper from 'src/application/mappers/contact.mapper';
import EventMapper from 'src/application/mappers/event.mapper';
import SocialNetworkMapper from 'src/application/mappers/social-network.mapper';
import IAssociationService from 'src/domain/services/iassociation.service';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';

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
    // Services:
    {
      provide: IAssociationService,
      useClass: AssociationService,
    },

    // Repositories:
    {
      provide: IAssociationRepository,
      useClass: AssociationRepository,
    },

    // Mappers:
    AssociationMapper,
    AddressMapper,
    MemberMapper,
    PhoneNumberMapper,
    ContactMapper,
    EventMapper,
    SocialNetworkMapper,
  ],
})
export class AssociationModule {}
