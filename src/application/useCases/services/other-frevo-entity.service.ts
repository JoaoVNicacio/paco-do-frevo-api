import { Inject, Injectable } from '@nestjs/common';
import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import OtherFrevoEntityMapper from 'src/application/mappers/other-frevo-entity.mapper';
import PagedResults from 'src/application/responseObjects/paged.results';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import IOtherFrevoEntityService from 'src/domain/services/iother-frevo-entity.service';

@Injectable()
class OtherFrevoEntityService implements IOtherFrevoEntityService {
  constructor(
    @Inject(IOtherFrevoEntityRepository)
    private readonly _otherFrevoEntityRepository: IOtherFrevoEntityRepository,
    private readonly _otherFrevoEntityMapper: OtherFrevoEntityMapper,
  ) {}

  public async createOtherFrevoEntity(
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>> {
    const otherFrevoEntity =
      this._otherFrevoEntityMapper.dtoToEntity(otherFrevoEntityDTO);
    const isValid = await otherFrevoEntity.isValid();

    if (!isValid) {
      return new ValidationResponse(
        otherFrevoEntity,
        await otherFrevoEntity.validateCreation(),
        isValid,
      );
    }

    const insertResponse =
      await this._otherFrevoEntityRepository.createResume(otherFrevoEntity);

    return new ValidationResponse(
      insertResponse,
      await otherFrevoEntity.validateCreation(),
      isValid,
    );
  }

  public async getAllOtherFrevoEntities(): Promise<Array<OtherFrevoEntity>> {
    return await this._otherFrevoEntityRepository.getAll();
  }

  public async getPagedOtherFrevoEntities(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<OtherFrevoEntity>> {
    const results =
      await this._otherFrevoEntityRepository.getPagedOtherFrevoEntities(
        page,
        pageSize,
      );

    const hasNextPage = results.total > page * pageSize;

    return new PagedResults(
      results.otherFrevoEntitys,
      hasNextPage,
      page,
      pageSize,
      results.total,
    );
  }

  public async getOtherFrevoEntityById(id: string): Promise<OtherFrevoEntity> {
    return await this._otherFrevoEntityRepository.getById(id);
  }

  public async updateOtherFrevoEntity(
    id: string,
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>> {
    const otherFrevoEntity =
      this._otherFrevoEntityMapper.dtoToEntity(otherFrevoEntityDTO);
    const isValid = await otherFrevoEntity.isValid();

    if (!isValid) {
      return new ValidationResponse(
        otherFrevoEntity,
        await otherFrevoEntity.validateCreation(),
        isValid,
      );
    }

    const updateResponse =
      await this._otherFrevoEntityRepository.updateOtherFrevoEntity(
        id,
        otherFrevoEntity,
      );

    return new ValidationResponse(
      updateResponse,
      await otherFrevoEntity.validateCreation(),
      isValid,
    );
  }

  public async deleteOtherFrevoEntity(id: string): Promise<void> {
    return await this._otherFrevoEntityRepository.deleteOtherFrevoEntity(id);
  }
}

export default OtherFrevoEntityService;
