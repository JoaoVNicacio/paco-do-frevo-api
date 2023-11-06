import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import Association from '../entities/associationAggregate/association.entity';

interface IAssociationService {
  createAssociation(associationDTO: AssociationDTO): Promise<Association>;
  getAllAssociations(): Promise<Array<Association>>;
  getAssociationById(id: string): Promise<Association>;
  updateAssociation(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<Association>;
  deleteAssociation(id: string): Promise<void>;
}

export default IAssociationService;
