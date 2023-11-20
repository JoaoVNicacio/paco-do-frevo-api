import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import Association from '../entities/associationAggregate/association.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';

interface IAssociationService {
  createAssociation(
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  getAllAssociations(): Promise<Array<Association>>;
  getAssociationById(id: string): Promise<Association>;
  updateAssociation(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<Association>;
  deleteAssociation(id: string): Promise<void>;
}

export default IAssociationService;
