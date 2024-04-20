import Association from '../aggregates/associationAggregate/association.entity';

interface IAssociationRepository {
  createAssociation(association: Association): Promise<Association>;
  getAll(): Promise<Array<Association> | any>;
  getById(id: string): Promise<Association | undefined>;
  getPagedAssociations(
    page: number,
    pageSize: number,
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
