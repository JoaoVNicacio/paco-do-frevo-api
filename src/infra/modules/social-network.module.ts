import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import SocialNetworkController from '../controllers/social-network.controller';
import SocialNetworkRepository from '../repositories/social-network.repository';
import SocialNetworkService from 'src/application/useCases/services/social-network.service';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationRepository from '../repositories/association.repository';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import ISocialNetworkRepository from 'src/domain/repositories/isocial-network.repository';
import ISocialNetworkService from 'src/domain/services/isocial-network.service';
import mapper from 'src/application/mappers/mapper';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetwork, Association])],
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
      provide: 'IMapper',
      useValue: mapper,
    },
  ],
})
export class SocialNetworkModule {}
