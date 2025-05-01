import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SocialNetworkRepository from '../repositories/social-network.repository';
import SocialNetworkService from 'src/application/services/social-network.service';
import AssociationRepository from '../repositories/association.repository';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import ISocialNetworkRepository from 'src/domain/repositories/isocial-network.repository';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManager } from '@nestjs/cache-manager';
import ISocialNetworkService from 'src/application/contracts/services/isocial-network.service';
import mapper from 'src/application/mapping/mapper';
import SocialNetworkController from 'src/api/controllers/social-network.controller';
import AssociationDBSchema from '../schemas/associationAggregate/association.schema';
import SocialNetworkDBSchema from '../schemas/associationAggregate/social-network.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([SocialNetworkDBSchema, AssociationDBSchema]),
  ],
  controllers: [SocialNetworkController],
  providers: [
    // Services:
    {
      provide: ISocialNetworkService,
      useClass: SocialNetworkService,
    },

    // Repositories:
    {
      provide: ISocialNetworkRepository,
      useClass: SocialNetworkRepository,
    },
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
  ],
})
export class SocialNetworkModule {}
