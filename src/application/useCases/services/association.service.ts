import { Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import AssociationMapper from 'src/application/mappers/association.mapper';
import PagedResults from 'src/application/responseObjects/paged.results';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import IAssociationService from 'src/domain/services/iassociation.service';
import AssociationRepository from 'src/infra/repositories/association.repository';

@Injectable()
class AssociationService implements IAssociationService {
  constructor(
    private readonly _associationRepository: AssociationRepository,
    private readonly _associationMapper: AssociationMapper,
  ) {}

  public async createAssociation(
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>> {
    const association = this._associationMapper.dtoToEntity(associationDTO);
    const isValid = await association.isValid();

    if (!isValid) {
      return new ValidationResponse(
        association,
        await association.validateCreation(),
        isValid,
      );
    }

    const insertResponse =
      await this._associationRepository.createResume(association);

    return new ValidationResponse(
      insertResponse,
      await association.validateCreation(),
      isValid,
    );
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
  ): Promise<Association> {
    const association = this._associationMapper.dtoToEntity(associationDTO);

    return await this._associationRepository.updateAssociation(id, association);
  }

  public async deleteAssociation(id: string): Promise<void> {
    return await this._associationRepository.deleteAssociation(id);
  }
}

export default AssociationService;
