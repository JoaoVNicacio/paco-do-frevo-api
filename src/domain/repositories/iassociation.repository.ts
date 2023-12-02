import Association from '../entities/associationAggregate/association.entity';

interface IAssociationRepository {
  createAssociation(association: Association): Promise<Association>;
  getAll(): Promise<Array<Association> | any>;
  getById(id: string): Promise<Association | undefined>;
  updateAssociation(
    id: string,
    association: Association,
  ): Promise<Association | undefined>;
  deleteAssociation(id: string): Promise<void>;
}

export default IAssociationRepository;
