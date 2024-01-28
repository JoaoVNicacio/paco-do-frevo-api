import { InjectRepository as InjectContext } from '@nestjs/typeorm';
import { Repository as DBContext } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';

@Injectable()
class AssociationRepository implements IAssociationRepository {
  constructor(
    @InjectContext(Association)
    private readonly _associationContext: DBContext<Association>,
  ) {}

  public async createAssociation(
    association: Association,
  ): Promise<Association> {
    const createdAssociation = this._associationContext.create(association);

    return await this._associationContext.save(createdAssociation);
  }

  public async getAll(): Promise<Array<Association>> {
    return this._associationContext.find();
  }

  public async getPagedAssociations(
    page: number,
    pageSize: number,
  ): Promise<{
    associations: Array<Association>;
    total: number;
  }> {
    const queryBuilder =
      this._associationContext.createQueryBuilder('association');

    const [associations, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { associations, total };
  }

  public async getById(id: string): Promise<Association> {
    return await this._associationContext.findOne({
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

    this._associationContext.merge(existingAssociation, association);

    return await this._associationContext.save(existingAssociation);
  }

  public async deleteAssociation(id: string): Promise<void> {
    const result = await this._associationContext.delete(id);

    if (result.affected === 0) {
      throw new Error('Associação não encontrada.');
    }
  }
}

export default AssociationRepository;
