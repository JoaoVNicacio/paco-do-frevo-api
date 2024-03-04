import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import CleanStringBuilder from 'src/application/utils/clean-string.builder';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IAssociationService from 'src/domain/services/iassociation.service';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';

@Injectable()
class AssociationService implements IAssociationService {
  constructor(
    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,

    @Inject(Mapper)
    private readonly _mapper: IMapper,

    @Inject(CacheManager)
    private readonly _cacheManager: Cache,

    @Inject(Logger)
    private readonly _logger: ILogger,
  ) {}

  public async createAssociation(
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>> {
    const association = this._mapper.map(
      associationDTO,
      AssociationDTO,
      Association,
    );

    const isValid = await association.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The Association ${associationDTO.name} didn't pass validation.`,
      );

      return new ValidationResponse(
        association,
        await association.validateCreation(),
      );
    }

    if (association.getCnpj) {
      association.setCnpj = CleanStringBuilder.fromString(association.getCnpj)
        .withoutDashes()
        .withoutDots()
        .withoutSlashes()
        .build();
    }

    const insertResponse =
      await this._associationRepository.createAssociation(association);

    const response = new ValidationResponse(
      insertResponse,
      await association.validateCreation(),
    );

    this._logger.log(
      `<💾> ➤ Created the Association with id: ${insertResponse.id} and related objects.`,
    );

    if (response.isValid) {
      await this._cacheManager.del(`associations`);

      this._logger.log(
        `<🗑️> ➤ Deleted cache of get all Associations due to creation of ${insertResponse.id}.`,
      );
    }

    return response;
  }

  public async getAllAssociations(): Promise<Array<Association>> {
    return await this._associationRepository.getAll();
  }

  public async getPagedAssociations(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<Association>> {
    const results = await this._associationRepository.getPagedAssociations(
      page,
      pageSize,
    );

    const hasNextPage = results.total > page * pageSize;

    return new PagedResults(
      results.associations,
      hasNextPage,
      page,
      pageSize,
      results.total,
    );
  }

  public async getAssociationById(id: string): Promise<Association> {
    return await this._associationRepository.getById(id);
  }

  public async updateAssociation(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>> {
    const association = this._mapper.map(
      associationDTO,
      AssociationDTO,
      Association,
    );
    const isValid = await association.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The update for the Association ${id} didn't pass validation.`,
      );

      return new ValidationResponse(
        association,
        await association.validateCreation(),
      );
    }

    association.setCnpj = CleanStringBuilder.fromString(association.getCnpj)
      .withoutDashes()
      .withoutDots()
      .withoutSlashes()
      .build();

    const updateResponse = await this._associationRepository.updateAssociation(
      id,
      association,
    );

    this._logger.log(
      `<🔁> ➤ Updated the Association with id: ${id} and related objects.`,
    );

    await Promise.all([
      async () => await this._cacheManager.del(`associations/id/${id}`),
      async () => await this._cacheManager.del(`associations`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted cache entries from the Association with id: ${id} due to update.`,
    );

    const response = new ValidationResponse(
      updateResponse,
      await association.validateCreation(),
    );

    return response;
  }

  public async deleteAssociation(id: string): Promise<void> {
    await Promise.all([
      this._associationRepository.deleteAssociation(id),
      async () => await this._cacheManager.del(`associations/id/${id}`),
      async () => await this._cacheManager.del(`associations`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted Association with id: ${id} from the DB and cache entries.`,
    );
  }
}

export default AssociationService;
