import { Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import AssociationMapper from 'src/application/mappers/association.mapper';
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

  public async getAllAssociations(): Promise<Association[]> {
    return this._associationRepository.findAll();
  }

  async getAssociationById(id: string): Promise<Association> {
    return this._associationRepository.findById(id);
  }

  public async updateAssociation(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<Association> {
    const association = this._associationMapper.dtoToEntity(associationDTO);

    return this._associationRepository.updateAssociation(id, association);
  }

  public async deleteAssociation(id: string): Promise<void> {
    return this._associationRepository.deleteAssociation(id);
  }
}

export default AssociationService;
