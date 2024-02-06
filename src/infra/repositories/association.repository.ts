import { InjectRepository as InjectDBAccessor } from '@nestjs/typeorm';
import { Repository as DBAccessor } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';

@Injectable()
class AssociationRepository implements IAssociationRepository {
  constructor(
    @InjectDBAccessor(Association)
    private readonly _associationDBAccessor: DBAccessor<Association>,
  ) {}

  public async createAssociation(
    association: Association,
  ): Promise<Association> {
    const createdAssociation = this._associationDBAccessor.create(association);

    return await this._associationDBAccessor.save(createdAssociation);
  }

  public async getAll(): Promise<Array<Association>> {
    return this._associationDBAccessor.find();
  }

  public async getPagedAssociations(
    page: number,
    pageSize: number,
  ): Promise<{
    associations: Array<Association>;
    total: number;
  }> {
    const queryBuilder =
      this._associationDBAccessor.createQueryBuilder('association');

    const [associations, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { associations, total };
  }

  public async getById(id: string): Promise<Association> {
    return await this._associationDBAccessor.findOne({
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
      throw new NotFoundException('Associação não encontrada.');
    }

    this._associationDBAccessor.merge(existingAssociation, association);

    return await this._associationDBAccessor.save(existingAssociation);
  }

  public async deleteAssociation(id: string): Promise<void> {
    const result = await this._associationDBAccessor.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Associação não encontrada.');
    }
  }
}

export default AssociationRepository;
