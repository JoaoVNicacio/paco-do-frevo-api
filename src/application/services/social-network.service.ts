import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import ValidationResponse from 'src/shared/responseObjects/validation.response';
import SocialNetwork from 'src/domain/aggregates/associationAggregate/social-network.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import ISocialNetworkRepository from 'src/domain/repositories/isocial-network.repository';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import ISocialNetworkService from '../contracts/services/isocial-network.service';
import SocialNetworkValidator from '../validation/social-network.validator';

@Injectable()
class SocialNetworkService implements ISocialNetworkService {
  constructor(
    @Inject(ISocialNetworkRepository)
    private readonly _socialNetworkRepository: ISocialNetworkRepository,
    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,
    @Inject(Mapper)
    private readonly _mapper: IMapper,
    @Inject(CacheManager)
    private readonly _cacheManager: Cache,
    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  public async createEntry(
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
      this._logger.log(
        `<⛔️> ➤ The new social network for ${associationId} didn't pass validation.`,
      );

      const error = new ValidationError();
      error.constraints = { notFound: 'The association does not exists' };
      error.property = 'associationId';
      error.children = [];

      return new ValidationResponse(socialNetwork, [error]);
    }

    socialNetwork.association = association;

    socialNetwork.sanitizeEntityProperties();

    socialNetwork.validationDelegate =
      new SocialNetworkValidator().validate.bind(new SocialNetworkValidator());

    const isValid = await socialNetwork.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The new social network for ${associationId} didn't pass validation.`,
      );

      return new ValidationResponse(
        socialNetwork,
        await socialNetwork.validateEntity(),
      );
    }

    const insertResponse =
      await this._socialNetworkRepository.createSocialNetwork(socialNetwork);

    this._logger.log(
      `<💾> ➤ Created the Social network with id: ${insertResponse.id}.`,
    );

    return new ValidationResponse(
      insertResponse,
      await socialNetwork.validateEntity(),
    );
  }

  public async getById(id: string): Promise<SocialNetwork> {
    return this._socialNetworkRepository.getById(id);
  }

  public async updateEntryById(
    id: string,
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<ValidationResponse<SocialNetwork>> {
    const socialNetwork = this._mapper.map(
      socialNetworkDTO,
      SocialNetworkDTO,
      SocialNetwork,
    );

    socialNetwork.sanitizeEntityProperties();

    socialNetwork.validationDelegate =
      new SocialNetworkValidator().validate.bind(new SocialNetworkValidator());

    const isValid = await socialNetwork.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The update for the Social network ${id} didn't pass validation.`,
      );

      return new ValidationResponse(
        socialNetwork,
        await socialNetwork.validateEntity(),
      );
    }

    const [updateResponse] = await Promise.all([
      this._socialNetworkRepository.updateSocialNetwork(id, socialNetwork),
      this._cacheManager.del(`social-networks/id/${id}`),
    ]);

    this._logger.log(`<🔁> ➤ Updated the Social network with id: ${id}.`);

    this._logger.log(
      `<🗑️> ➤ Deleted cache entries from the Social network with id: ${id} due to update.`,
    );

    return new ValidationResponse(
      updateResponse,
      await socialNetwork.validateEntity(),
    );
  }

  public async deleteEntryById(id: string): Promise<void> {
    await Promise.all([
      this._socialNetworkRepository.deleteSocialNetwork(id),
      this._cacheManager.del(`social-networks/id/${id}`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted Social network with id: ${id} from the DB and cache entries.`,
    );
  }
}

export default SocialNetworkService;
