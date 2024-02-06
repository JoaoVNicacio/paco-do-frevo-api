import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import Association from '../entities/associationAggregate/association.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import PagedResults from 'src/application/responseObjects/paged.results';

interface IAssociationService {
  createAssociation(
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  getAllAssociations(): Promise<Array<Association>>;
  getPagedAssociations(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<Association>>;
  getAssociationById(id: string): Promise<Association>;
  updateAssociation(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  deleteAssociation(id: string): Promise<void>;
}

const IAssociationService = Symbol('IAssociationService');

export default IAssociationService;
