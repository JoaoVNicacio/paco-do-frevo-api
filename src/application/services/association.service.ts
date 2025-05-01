import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/shared/responseObjects/paged.results';
import ValidationResponse from 'src/shared/responseObjects/validation.response';
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
import AssociationFilteringParam from 'src/shared/requestObjects/params/association.filtering-param';
import SimplifiedAssociationDTO from '../dtos/associationDtos/simplified-association.dto';
import EOrderingParam from 'src/shared/requestObjects/params/enums/eordering.param';
import AssociationValidator from '../validation/association.validator';

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
    userId?: string,
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

    association.sanitizeEntityProperties();
    association.setCreationStamps(userId);

    association.validationDelegate = new AssociationValidator().validate.bind(
      new AssociationValidator(),
    );

    const isValid = await association.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The Association ${associationDTO.name} didn't pass validation.`,
      );

      return new ValidationResponse(
        association,
        await association.validateEntity(),
      );
    }

    const [insertResponse] = await Promise.all([
      this._associationRepository.createAssociation(association),
      this._cacheManager.del(`associations`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted cache of get all Associations due to creation of ${insertResponse.id}.`,
    );

    this._logger.log(
      `<💾> ➤ Created the Association with id: ${insertResponse.id} and related objects.`,
    );

    const response = new ValidationResponse(
      insertResponse,
      await association.validateEntity(),
    );

    if (response.isValid) {
    }

    return response;
  }

  public async getAll(
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<Array<SimplifiedAssociationDTO>> {
    return this._mapper.mapArray(
      await this._associationRepository.getAll(filterParams, orderingParam),
      Association,
      SimplifiedAssociationDTO,
    );
  }

  public async getPaged(
    page: number,
    pageSize: number,
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<PagedResults<SimplifiedAssociationDTO>> {
    const results = await this._associationRepository.getPagedAssociations(
      page,
      pageSize,
      filterParams,
      orderingParam,
    );

    return new PagedResults(
      this._mapper.mapArray(
        results.associations,
        Association,
        SimplifiedAssociationDTO,
      ),
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

    association.sanitizeEntityProperties();

    association.validationDelegate = new AssociationValidator().validate.bind(
      new AssociationValidator(),
    );

    const isValid = await association.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The update for the Association ${id} didn't pass validation.`,
      );

      return new ValidationResponse(
        association,
        await association.validateEntity(),
      );
    }

    const [updateResponse] = await Promise.all([
      this._associationRepository.updateAssociation(id, association),
      this._cacheManager.del(`associations/id/${id}`),
      this._cacheManager.del(`associations`),
    ]);

    this._logger.log(
      `<🔁> ➤ Updated the Association with id: ${id} and related objects.`,
    );

    this._logger.log(
      `<🗑️> ➤ Deleted cache entries from the Association with id: ${id} due to update.`,
    );

    const response = new ValidationResponse(
      updateResponse,
      await association.validateEntity(),
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
