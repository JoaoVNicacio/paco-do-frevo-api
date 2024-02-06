import OtherFrevoEntityService from 'src/application/useCases/services/other-frevo-entity.service';
import OtherFrevoEntityRepository from '../repositories/other-frevo-entity.repository';
import OtherFrevoEntityController from '../controllers/other-frevo-entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import OtherFrevoEntityAddress from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import { Module } from '@nestjs/common';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import IOtherFrevoEntityService from 'src/domain/services/iother-frevo-entity.service';
import mapper from 'src/application/mappers/mapper';

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
      provide: 'IMapper',
      useValue: mapper,
    },
  ],
})
export class OtherFrevoEntityModule {}
