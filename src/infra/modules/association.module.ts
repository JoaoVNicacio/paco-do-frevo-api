import { ConsoleLogger, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AssociationService from 'src/application/services/association.service';
import AssociationRepository from '../repositories/association.repository';
import { EventModule } from './event.module';
import { PhoneNumberModule } from './phone-number.module';
import { ContactModule } from './contact.module';
import { SocialNetworkModule } from './social-network.module';
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
import AssociationDBSchema from '../schemas/associationAggregate/association.schema';
import AssociationAddressDBSchema from '../schemas/associationAggregate/address.schema';
import PhoneNumberDBSchema from '../schemas/associationAggregate/phone-number.schema';
import EventDBSchema from '../schemas/associationAggregate/event.schema';
import MemberDBSchema from '../schemas/associationAggregate/member.schema';
import ContactDBSchema from '../schemas/associationAggregate/contact.schema';
import SocialNetworkDBSchema from '../schemas/associationAggregate/social-network.schema';

@Module({
  imports: [
    EventModule,
    PhoneNumberModule,
    ContactModule,
    SocialNetworkModule,
    TypeOrmModule.forFeature([
      AssociationDBSchema,
      AssociationAddressDBSchema,
      EventDBSchema,
      MemberDBSchema,
      PhoneNumberDBSchema,
      ContactDBSchema,
      EventDBSchema,
      SocialNetworkDBSchema,
    ]),
  ],
  controllers: [AssociationController],
  providers: [
    // Services:
    {
      provide: IAssociationService,
      useClass: AssociationService,
      scope: Scope.REQUEST,
    },

    // Repositories:
    {
      provide: IAssociationRepository,
      useClass: AssociationRepository,
      scope: Scope.REQUEST,
    },

    // Mappers:
    {
      provide: Mapper,
      useValue: mapper,
      scope: Scope.DEFAULT,
    },

    // CacheManager:
    {
      provide: CacheManager,
      useExisting: cacheManager,
      scope: Scope.DEFAULT,
    },

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
      scope: Scope.DEFAULT,
    },

    // Pipes:
    {
      provide: NormalizeZipCodePipe,
      useClass: NormalizeZipCodePipe,
      scope: Scope.TRANSIENT,
    },

    {
      provide: PagingParamsPipe,
      useClass: PagingParamsPipe,
      scope: Scope.TRANSIENT,
    },

    {
      provide: AssociationFilteringParamPipe,
      useClass: AssociationFilteringParamPipe,
      scope: Scope.TRANSIENT,
    },
  ],
})
export class AssociationModule {}
