import { Mapper as IMapper } from '@automapper/core';
import { Inject, Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import CleanStringBuilder from 'src/application/utils/clean-string.builder';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IAssociationService from 'src/domain/services/iassociation.service';
import { CACHE_MANAGER as CacheManager, Cache } from '@nestjs/cache-manager';

@Injectable()
class AssociationService implements IAssociationService {
  constructor(
    @Inject(IAssociationRepository)
    private readonly _associationRepository: IAssociationRepository,

    @Inject('IMapper')
    private readonly _mapper: IMapper,

    @Inject(CacheManager)
    private readonly _cacheManager: Cache,
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

    if (response.isValid) {
      await this._cacheManager.del(`associations`);
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

    const response = new ValidationResponse(
      updateResponse,
      await association.validateCreation(),
    );

    await this._cacheManager.del(`associations/id/${id}`);
    await this._cacheManager.del(`associations`);

    return response;
  }

  public async deleteAssociation(id: string): Promise<void> {
    await this._associationRepository.deleteAssociation(id).then(async () => {
      await this._cacheManager.del(`associations/id/${id}`);
      await this._cacheManager.del(`associations`);
    });
  }
}

export default AssociationService;
