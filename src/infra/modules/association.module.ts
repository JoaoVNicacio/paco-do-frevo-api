import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import AssociationService from 'src/application/useCases/services/association.service';
import AssociationController from '../controllers/association.controller';
import AssociationRepository from '../repositories/association.repository';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import Member from 'src/domain/entities/associationAggregate/member.entity';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import { EventModule } from './event.module';
import { PhoneNumberModule } from './phone-number.module';
import { ContactModule } from './contact.module';
import { SocialNetworkModule } from './social-network.module';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
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
  ],
})
export class AssociationModule {}
