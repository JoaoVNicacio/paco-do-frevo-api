import OtherFrevoEntityService from 'src/application/services/other-frevo-entity.service';
import OtherFrevoEntityRepository from '../repositories/other-frevo-entity.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import OtherFrevoEntityAddress from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import { ConsoleLogger, Module } from '@nestjs/common';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManger } from '@nestjs/cache-manager';
import IOtherFrevoEntityService from 'src/application/contracts/services/iother-frevo-entity.service';
import mapper from 'src/application/mapping/mapper';
import OtherFrevoEntityController from 'src/api/controllers/other-frevo-entity.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtherFrevoEntity, OtherFrevoEntityAddress]),
  ],
  controllers: [OtherFrevoEntityController],
  providers: [
    // Services:
    {
      provide: IOtherFrevoEntityService,
      useClass: OtherFrevoEntityService,
    },

    // Repositories:
    {
      provide: IOtherFrevoEntityRepository,
      useClass: OtherFrevoEntityRepository,
    },

    // Mappers:
    {
      provide: Mapper,
      useValue: mapper,
    },

    // CacheManager:
    {
      provide: CacheManager,
      useValue: cacheManger,
    },

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
    },
  ],
})
export class OtherFrevoEntityModule {}
