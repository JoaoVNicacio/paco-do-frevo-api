import OtherFrevoEntityService from 'src/application/useCases/services/other-frevo-entity.service';
import OtherFrevoEntityRepository from '../repositories/other-frevo-entity.repository';
import OtherFrevoEntityMapper from 'src/application/mappers/other-frevo-entity.mapper';
import AddressMapper from 'src/application/mappers/address.mapper';
import MemberMapper from 'src/application/mappers/member.mapper';
import OtherFrevoEntityController from '../controllers/other-frevo-entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import OtherFrevoEntityAddress from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtherFrevoEntity, OtherFrevoEntityAddress]),
  ],
  controllers: [OtherFrevoEntityController],
  providers: [
    OtherFrevoEntityService,
    OtherFrevoEntityRepository,
    OtherFrevoEntityMapper,
    AddressMapper,
    MemberMapper,
  ],
})
export class OtherFrevoEntityModule {}
