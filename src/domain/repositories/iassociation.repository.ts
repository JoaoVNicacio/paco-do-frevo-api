import AssociationFilteringParam from 'src/shared/requestObjects/params/association.filtering-param';
import Association from '../aggregates/associationAggregate/association.entity';
import EOrderingParam from 'src/shared/requestObjects/params/enums/eordering.param';

interface IAssociationRepository {
  createAssociation(association: Association): Promise<Association>;
  getAll(
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<Array<Association> | undefined>;
  getById(id: string): Promise<Association | undefined>;
  getPagedAssociations(
    page: number,
    pageSize: number,
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<{
    associations: Array<Association>;
    total: number;
  }>;
  updateAssociation(
    id: string,
    association: Association,
  ): Promise<Association | undefined>;
  deleteAssociation(id: string): Promise<void>;
}

const IAssociationRepository = Symbol('IAssociationRepository');

export default IAssociationRepository;
