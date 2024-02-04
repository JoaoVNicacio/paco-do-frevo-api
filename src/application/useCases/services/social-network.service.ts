import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import ISocialNetworkRepository from 'src/domain/repositories/isocial-network.repository';
import ISocialNetworkService from 'src/domain/services/isocial-network.service';

@Injectable()
class SocialNetworkService implements ISocialNetworkService {
  constructor(
    @Inject(ISocialNetworkRepository)
    private readonly _socialNetworkRepository: ISocialNetworkRepository,

    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,

    @Inject('IMapper')
    private readonly _mapper: IMapper,
  ) {}

  public async createSocialNetwork(
    socialNetworkDTO: SocialNetworkDTO,
    associationId: string,
  ): Promise<ValidationResponse<SocialNetwork>> {
    const socialNetwork = this._mapper.map(
      socialNetworkDTO,
      SocialNetworkDTO,
      SocialNetwork,
    );

    const association =
      await this._associationRepository.getById(associationId);

    if (!association) {
      const error = new ValidationError();
      error.constraints = { associationId: 'The association does not exists' };

      return new ValidationResponse(socialNetwork, [error]);
    }

    socialNetwork.association = association;

    const isValid = await socialNetwork.isValid();

    if (!isValid) {
      return new ValidationResponse(
        socialNetwork,
        await socialNetwork.validateCreation(),
      );
    }

    const insertResponse =
      await this._socialNetworkRepository.createSocialNetwork(socialNetwork);

    return new ValidationResponse(
      insertResponse,
      await socialNetwork.validateCreation(),
    );
  }

  public async getAllSocialNetworks(): Promise<Array<SocialNetwork>> {
    return await this._socialNetworkRepository.getAll();
  }

  public async getSocialNetworkById(id: string): Promise<SocialNetwork> {
    return this._socialNetworkRepository.getById(id);
  }

  public async updateSocialNetwork(
    id: string,
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<ValidationResponse<SocialNetwork>> {
    const socialNetwork = this._mapper.map(
      socialNetworkDTO,
      SocialNetworkDTO,
      SocialNetwork,
    );

    const isValid = await socialNetwork.isValid();

    if (!isValid) {
      return new ValidationResponse(
        socialNetwork,
        await socialNetwork.validateCreation(),
      );
    }

    const updateResponse =
      await this._socialNetworkRepository.updateSocialNetwork(
        id,
        socialNetwork,
      );

    return new ValidationResponse(
      updateResponse,
      await socialNetwork.validateCreation(),
    );
  }

  public async deleteSocialNetwork(id: string): Promise<void> {
    return await this._socialNetworkRepository.deleteSocialNetwork(id);
  }
}

export default SocialNetworkService;
