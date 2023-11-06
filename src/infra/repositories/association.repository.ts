import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';

@Injectable()
class AssociationRepository implements IAssociationRepository {
  constructor(
    @InjectRepository(Association)
    private _associationRepository: Repository<Association>,
  ) {}

  public async createResume(association: Association): Promise<Association> {
    const createdAssociation = this._associationRepository.create(association);

    return await this._associationRepository.save(createdAssociation);
  }

  public async getAll(): Promise<Array<Association>> {
    return this._associationRepository.find();
  }

  public async getPagedAssociations(
    page: number,
    pageSize: number,
  ): Promise<{
    associations: Array<Association>;
    total: number;
  }> {
    // eslint-disable-next-line prettier/prettier
    const queryBuilder = this._associationRepository.createQueryBuilder('association');

    const [associations, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { associations, total };
  }

  public async getById(id: string): Promise<Association> {
    return await this._associationRepository.findOne({
      where: { id },
      relations: ['address', 'events', 'members', 'socialNetworks', 'contacts'],
    });
  }

  public async updateAssociation(
    id: string,
    association: Association,
  ): Promise<Association> {
    const existingAssociation = await this.getById(id);

    if (!existingAssociation) {
      throw new Error('Associação não encontrada.');
    }

    this._associationRepository.merge(existingAssociation, association);

    return await this._associationRepository.save(existingAssociation);
  }

  public async deleteAssociation(id: string): Promise<void> {
    const result = await this._associationRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Associação não encontrada.');
    }
  }
}

export default AssociationRepository;
