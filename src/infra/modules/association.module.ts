import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import AssociationService from 'src/application/useCases/services/association.service';
import AssociationController from '../controllers/association.controller';
import AssociationRepository from '../repositories/association.repository';
import AssociationMapper from 'src/application/mappers/association.mapper';
import AddressMapper from 'src/application/mappers/address.mapper';
import Event from 'src/domain/entities/associationAggregate/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Association, AssociationAddress, Event])],
  controllers: [AssociationController],
  providers: [
    AssociationService,
    AssociationRepository,
    AssociationMapper,
    AddressMapper,
  ],
})
export class AssociationModule {}
