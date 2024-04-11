import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import IAssociationService from '../contracts/services/iassociation.service';
import NormalizeZipCodePipe from '../pipes/normalize-zipcode.pipe';

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

    private readonly _normalizeZipCodePipe: NormalizeZipCodePipe,
  ) {}

  public async createEntry(
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>> {
    const association = this._mapper.map(
      associationDTO,
      AssociationDTO,
      Association,
    );

    if (association.address) {
      association.address.zipCode = this._normalizeZipCodePipe.transform(
        association.address,
      );
    }

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

    if (association.associationCnpj) {
      association.associationCnpj = CleanStringBuilder.fromString(
        association.associationCnpj,
      )
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

  public async getAll(): Promise<Array<Association>> {
    return await this._associationRepository.getAll();
  }

  public async getPaged(
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

  public async getById(id: string): Promise<Association> {
    return await this._associationRepository.getById(id);
  }

  public async updateEntryById(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>> {
    const association = this._mapper.map(
      associationDTO,
      AssociationDTO,
      Association,
    );

    association.address.zipCode = this._normalizeZipCodePipe.transform(
      association.address,
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

    association.associationCnpj = CleanStringBuilder.fromString(
      association.associationCnpj,
    )
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
      this._cacheManager.del(`associations/id/${id}`),
      this._cacheManager.del(`associations`),
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

  public async deleteEntryById(id: string): Promise<void> {
    await Promise.all([
      this._associationRepository.deleteAssociation(id),
      this._cacheManager.del(`associations/id/${id}`),
      this._cacheManager.del(`associations`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted Association with id: ${id} from the DB and cache entries.`,
    );
  }
}

export default AssociationService;
