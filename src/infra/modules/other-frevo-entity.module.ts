import OtherFrevoEntityService from 'src/application/services/other-frevo-entity.service';
import OtherFrevoEntityRepository from '../repositories/other-frevo-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleLogger, Module, Scope } from '@nestjs/common';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManager } from '@nestjs/cache-manager';
import IOtherFrevoEntityService from 'src/application/contracts/services/iother-frevo-entity.service';
import mapper from 'src/application/mapping/mapper';
import OtherFrevoEntityController from 'src/api/controllers/other-frevo-entity.controller';
import NormalizeZipCodePipe from 'src/application/pipes/normalize-zipcode.pipe';
import OtherFrevoEntityDBSchema from '../schemas/otherFrevoMakersAggregate/other-frevo-entity.schema';
import OtherFrevoEntityAddressDBSchema from '../schemas/otherFrevoMakersAggregate/other-frevo-entity-address.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OtherFrevoEntityDBSchema,
      OtherFrevoEntityAddressDBSchema,
    ]),
  ],
  controllers: [OtherFrevoEntityController],
  providers: [
    // Services:
    {
      provide: IOtherFrevoEntityService,
      useClass: OtherFrevoEntityService,
      scope: Scope.REQUEST,
    },

    // Repositories:
    {
      provide: IOtherFrevoEntityRepository,
      useClass: OtherFrevoEntityRepository,
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
  ],
})
export class OtherFrevoEntityModule {}
