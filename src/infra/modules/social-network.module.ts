import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SocialNetworkMapper from 'src/application/mappers/social-network.mapper';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import SocialNetworkController from '../controllers/social-network.controller';
import SocialNetworkRepository from '../repositories/social-network.repository';
import SocialNetworkService from 'src/application/useCases/services/social-network.service';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationRepository from '../repositories/association.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetwork, Association])],
  controllers: [SocialNetworkController],
  providers: [
    SocialNetworkService,
    SocialNetworkRepository,
    AssociationRepository,
    SocialNetworkMapper,
  ],
})
export class SocialNetworkModule {}
