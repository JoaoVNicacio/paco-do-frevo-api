import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import AssociationAddress from 'src/domain/aggregates/associationAggregate/address.entity';
import AssociationService from 'src/application/services/association.service';
import AssociationRepository from '../repositories/association.repository';
import Event from 'src/domain/aggregates/associationAggregate/event.entity';
import Member from 'src/domain/aggregates/associationAggregate/member.entity';
import PhoneNumber from 'src/domain/aggregates/associationAggregate/phone-number.entity';
import Contact from 'src/domain/aggregates/associationAggregate/contact.entity';
import { EventModule } from './event.module';
import { PhoneNumberModule } from './phone-number.module';
import { ContactModule } from './contact.module';
import { SocialNetworkModule } from './social-network.module';
import SocialNetwork from 'src/domain/aggregates/associationAggregate/social-network.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManager } from '@nestjs/cache-manager';
import IAssociationService from 'src/application/contracts/services/iassociation.service';
import mapper from 'src/application/mapping/mapper';
import AssociationController from 'src/api/controllers/association.controller';
import NormalizeZipCodePipe from 'src/application/pipes/normalize-zipcode.pipe';
import PagingParamsPipe from 'src/application/pipes/paging-results.pipe';
import AssociationFilteringParamPipe from 'src/application/pipes/association.filtering-param.pipe';

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

    // Pipes:
    NormalizeZipCodePipe,
    PagingParamsPipe,
    AssociationFilteringParamPipe,
  ],
})
export class AssociationModule {}
