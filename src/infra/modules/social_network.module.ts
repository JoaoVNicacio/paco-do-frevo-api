import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SocialNetworkMapper from 'src/application/mappers/social-network.mapper';
import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';
import SocialNetworkController from '../controllers/social_network.controller';
import SocialNetworkRepository from '../repositories/social_network.repository';
import SocialNetworkService from 'src/application/useCases/services/social_network.service';
import Association from 'src/domain/entities/associationAggregate/association.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetwork, Association])],
  controllers: [SocialNetworkController],
  providers: [
    SocialNetworkService,
    SocialNetworkRepository,
    SocialNetworkMapper,
  ],
})
export class SocialNetworkModule {}
