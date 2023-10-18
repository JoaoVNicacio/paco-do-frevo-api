import Association from '../entities/associationAggregate/association.entity';

interface IAssociationRepository {
  getAll(): Array<Association>;
}

export default IAssociationRepository;
