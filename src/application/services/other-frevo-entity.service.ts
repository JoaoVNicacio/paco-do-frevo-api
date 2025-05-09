import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import PagedResults from 'src/shared/responseObjects/paged.results';
import ValidationResponse from 'src/shared/responseObjects/validation.response';
import OtherFrevoEntity from 'src/domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import {
  CacheManager,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { Cache } from 'cache-manager';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import IOtherFrevoEntityService from '../contracts/services/iother-frevo-entity.service';
import NormalizeZipCodePipe from '../pipes/normalize-zipcode.pipe';
import OtherFrevoEntityValidator from '../validation/other-frevo-entity.validator';

@Injectable()
class OtherFrevoEntityService implements IOtherFrevoEntityService {
  constructor(
    @Inject(IOtherFrevoEntityRepository)
    private readonly _otherFrevoEntityRepository: IOtherFrevoEntityRepository,
    @Inject(Mapper)
    private readonly _mapper: IMapper,
    @Inject(CacheManager)
    private readonly _cacheManager: Cache,
    @Inject(Logger)
    private readonly _logger: ILogger,
    private readonly _normalizeZipCodePipe: NormalizeZipCodePipe,
  ) {}

  public async createEntry(
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>> {
    const otherFrevoEntity = this._mapper.map(
      otherFrevoEntityDTO,
      OtherFrevoEntityDTO,
      OtherFrevoEntity,
    );

    if (otherFrevoEntity.address) {
      otherFrevoEntity.address.zipCode = this._normalizeZipCodePipe.transform(
        otherFrevoEntity.address,
      );
    }

    otherFrevoEntity.sanitizeEntityProperties();

    otherFrevoEntity.validationDelegate =
      new OtherFrevoEntityValidator().validate.bind(
        new OtherFrevoEntityValidator(),
      );

    const isValid = await otherFrevoEntity.isValid();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The Frevo entity ${otherFrevoEntity.name} didn't pass validation.`,
      );

      return new ValidationResponse(
        otherFrevoEntity,
        await otherFrevoEntity.validateEntity(),
      );
    }

    const [insertResponse] = await Promise.all([
      this._otherFrevoEntityRepository.createOtherFrevoEntity(otherFrevoEntity),
      this._cacheManager.del(`other-frevo-entities`),
    ]);

    this._logger.log(
      `<💾> ➤ Created the Frevo entity with id: ${insertResponse.id} and related objects.`,
    );
    this._logger.log(
      `<🗑️> ➤ Deleted cache of get all Frevo entities due to creation of ${insertResponse.id}.`,
    );

    return new ValidationResponse(
      insertResponse,
      await otherFrevoEntity.validateEntity(),
    );
  }

  public async getAll(): Promise<Array<OtherFrevoEntity>> {
    return await this._otherFrevoEntityRepository.getAll();
  }

  public async getPaged(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<OtherFrevoEntity>> {
    const results =
      await this._otherFrevoEntityRepository.getPagedOtherFrevoEntities(
        page,
        pageSize,
      );

    return new PagedResults(
      results.otherFrevoEntities,
      page,
      pageSize,
      results.total,
    );
  }

  public async getById(id: string): Promise<OtherFrevoEntity> {
    return await this._otherFrevoEntityRepository.getById(id);
  }

  public async updateEntryById(
    id: string,
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>> {
    const otherFrevoEntity = this._mapper.map(
      otherFrevoEntityDTO,
      OtherFrevoEntityDTO,
      OtherFrevoEntity,
    );

    otherFrevoEntity.address.zipCode = this._normalizeZipCodePipe.transform(
      otherFrevoEntity.address,
    );

    otherFrevoEntity.sanitizeEntityProperties();

    otherFrevoEntity.validationDelegate =
      new OtherFrevoEntityValidator().validate.bind(
        new OtherFrevoEntityValidator(),
      );

    const isValid = await otherFrevoEntity.isValid();

    if (!isValid) {
      return new ValidationResponse(
        otherFrevoEntity,
        await otherFrevoEntity.validateEntity(),
      );
    }

    const [updateResponse] = await Promise.all([
      this._otherFrevoEntityRepository.updateOtherFrevoEntity(
        id,
        otherFrevoEntity,
      ),
      this._cacheManager.del(`other-frevo-entities/id/${id}`),
      this._cacheManager.del(`other-frevo-entities`),
    ]);

    this._logger.log(
      `<🔁> ➤ Updated the Frevo entity with id: ${id} and related objects.`,
    );

    this._logger.log(
      `<🗑️> ➤ Deleted cache entries from the Frevo entity with id: ${id} due to update.`,
    );

    return new ValidationResponse(
      updateResponse,
      await otherFrevoEntity.validateEntity(),
    );
  }

  public async deleteEntryById(id: string): Promise<void> {
    await Promise.all([
      this._otherFrevoEntityRepository.deleteOtherFrevoEntity(id),
      this._cacheManager.del(`other-frevo-entities/id/${id}`),
      this._cacheManager.del(`other-frevo-entities`),
    ]);

    this._logger.log(
      `<🗑️> ➤ Deleted Frevo entity with id: ${id} from the DB and cache entries.`,
    );
  }
}

export default OtherFrevoEntityService;
