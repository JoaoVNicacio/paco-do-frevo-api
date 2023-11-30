import OtherFrevoEntityService from 'src/application/useCases/services/otherFrevoEntity.service';
import OtherFrevoEntityRepository from '../repositories/otherFrevoEntity.repository';
import OtherFrevoEntityMapper from 'src/application/mappers/otherFrevoEntity.mapper';
import AddressMapper from 'src/application/mappers/address.mapper';
import MemberMapper from 'src/application/mappers/member.mapper';
import OtherFrevoEntityController from '../controllers/otherFrevoEntity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/otherFrevoEntity.entity';
import OtherFrevoEntityAddress from 'src/domain/entities/otherFrevoMakersAggregate/otherFrevoEntityAddress.entity';
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
