import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetworkMapper from 'src/application/mappers/social-network.mapper';
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

    private readonly _socialNetworkMapper: SocialNetworkMapper,
  ) {}

  public async createSocialNetwork(
    socialNetworkDTO: SocialNetworkDTO,
    associationId: string,
  ): Promise<ValidationResponse<SocialNetwork>> {
    const socialNetwork =
      this._socialNetworkMapper.dtoToEntity(socialNetworkDTO);

    const association =
      await this._associationRepository.getById(associationId);

    if (!association) {
      const error = new ValidationError();
      error.constraints = { associationId: 'The association does not exists' };

      return new ValidationResponse(socialNetwork, [error], false);
    }

    socialNetwork.association = association;

    const isValid = await socialNetwork.isValid();

    if (!isValid) {
      return new ValidationResponse(
        socialNetwork,
        await socialNetwork.validateCreation(),
        isValid,
      );
    }

    const insertResponse =
      await this._socialNetworkRepository.createSocialNetwork(socialNetwork);

    return new ValidationResponse(
      insertResponse,
      await socialNetwork.validateCreation(),
      isValid,
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
    social_DTO: SocialNetworkDTO,
  ): Promise<ValidationResponse<SocialNetwork>> {
    const socialNetwork = this._socialNetworkMapper.dtoToEntity(social_DTO);

    const isValid = await socialNetwork.isValid();

    if (!isValid) {
      return new ValidationResponse(
        socialNetwork,
        await socialNetwork.validateCreation(),
        isValid,
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
      isValid,
    );
  }

  public async deleteSocialNetwork(id: string): Promise<void> {
    return await this._socialNetworkRepository.deleteSocialNetwork(id);
  }
}

export default SocialNetworkService;
