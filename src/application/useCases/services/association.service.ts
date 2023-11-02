import { Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import AssociationMapper from 'src/application/mappers/association.mapper';
import PagedResults from 'src/application/responseObjects/paged.results';
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
  ): Promise<Association> {
    const association = this._associationMapper.dtoToEntity(associationDTO);

    return this._associationRepository.createResume(association);
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

    return new PagedResults(results.associations, hasNextPage, page, pageSize);
  }

  async getAssociationById(id: string): Promise<Association> {
    return this._associationRepository.getById(id);
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
