import { InjectRepository as InjectDBAccessor } from '@nestjs/typeorm';
import { Repository as DBAccessor, SelectQueryBuilder } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import AssociationFilteringParam from 'src/shared/requestObjects/params/association.filtering-param';
import EOrderingParam from 'src/shared/requestObjects/params/enums/eordering.param';
import AssociationDBSchema from '../schemas/associationAggregate/association.schema';

@Injectable()
class AssociationRepository implements IAssociationRepository {
  constructor(
    @InjectDBAccessor(AssociationDBSchema)
    private readonly _associationDBAccessor: DBAccessor<AssociationDBSchema>,
  ) {}

  public async createAssociation(
    association: Association,
  ): Promise<Association> {
    const createdAssociation = this._associationDBAccessor.create(association);

    return await this._associationDBAccessor.save(createdAssociation);
  }

  public async getAll(
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<Array<Association>> {
    const queryBuilder =
      this._associationDBAccessor.createQueryBuilder('association');

    queryBuilder.leftJoinAndSelect('association.address', 'address');

    this.handleAssociationFilteringParams(filterParams, queryBuilder);

    this.orderingFactory(orderingParam, queryBuilder);

    return await queryBuilder.getMany();
  }

  public async getPagedAssociations(
    page: number,
    pageSize: number,
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<{
    associations: Array<Association>;
    total: number;
  }> {
    const queryBuilder =
      this._associationDBAccessor.createQueryBuilder('association');

    queryBuilder.leftJoinAndSelect('association.address', 'address');

    this.handleAssociationFilteringParams(filterParams, queryBuilder);

    this.orderingFactory(orderingParam, queryBuilder);

    const [associations, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { associations, total };
  }

  public async getById(id: string): Promise<Association> {
    return await this._associationDBAccessor.findOne({
      where: { id },
      relations: [
        'address',
        'events',
        'members',
        'socialNetworks',
        'contacts',
        'contacts.phoneNumbers',
      ],
    });
  }

  public async updateAssociation(
    id: string,
    association: Association,
  ): Promise<Association> {
    const existingAssociation = await this.getById(id);

    if (!existingAssociation)
      throw new NotFoundException('Associação não encontrada.');

    this._associationDBAccessor.merge(
      AssociationDBSchema.fromDomainEntity(existingAssociation),
      association,
    );

    return await this._associationDBAccessor.save(existingAssociation);
  }

  public async deleteAssociation(id: string): Promise<void> {
    const result = await this._associationDBAccessor.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Associação não encontrada.');
  }

  private orderingFactory(
    ordering: EOrderingParam | null | undefined,
    queryBuilder: SelectQueryBuilder<AssociationDBSchema>,
  ): void {
    switch (ordering) {
      case EOrderingParam.cronologicalDecending:
        queryBuilder.orderBy('association.createdAt', 'DESC');
        break;

      case EOrderingParam.cronologicalAscending:
        queryBuilder.orderBy('association.createdAt', 'ASC');
        break;

      case EOrderingParam.alphabeticalDescending:
        queryBuilder.orderBy('association.name', 'DESC');
        break;

      case EOrderingParam.alphabeticalAscending:
        queryBuilder.orderBy('association.name', 'ASC');
        break;

      default:
        queryBuilder.orderBy('association.createdAt', 'DESC');
        break;
    }
  }

  private handleAssociationFilteringParams(
    filterParams: AssociationFilteringParam | null | undefined,
    queryBuilder: SelectQueryBuilder<AssociationDBSchema>,
  ): void {
    if (!filterParams) return;

    if (filterParams.searchParam?.trim()) {
      queryBuilder.andWhere('UPPER(association.name) LIKE :name', {
        name: `%${filterParams.searchParam.toUpperCase().trim()}%`,
      });
    }

    if (filterParams.associationType) {
      queryBuilder.andWhere('association.associationType = :associationType', {
        associationType: filterParams.associationType,
      });
    }

    if (filterParams.district?.trim()) {
      queryBuilder.andWhere('UPPER(address.district) LIKE :district', {
        district: `%${filterParams.district.toUpperCase().trim()}%`,
      });
    }

    if (filterParams.state?.trim()) {
      queryBuilder.andWhere('UPPER(address.state) LIKE :state', {
        state: `%${filterParams.state.toUpperCase().trim()}%`,
      });
    }

    if (filterParams.city?.trim()) {
      queryBuilder.andWhere('UPPER(address.city) LIKE :city', {
        city: `%${filterParams.city.toUpperCase().trim()}%`,
      });
    }

    if (filterParams.minMemberAmmount) {
      queryBuilder.andWhere('association.activeMembers <= :minMemberAmmount', {
        minMemberAmmount: filterParams.minMemberAmmount,
      });
    }

    if (filterParams.maxMemberAmmount) {
      queryBuilder.andWhere('association.activeMembers <= :maxMemberAmmount', {
        maxMemberAmmount: filterParams.maxMemberAmmount,
      });
    }
  }
}

export default AssociationRepository;
