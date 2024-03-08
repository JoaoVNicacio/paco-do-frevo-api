import ValidationResponse from 'src/application/responseObjects/validation.response';
import PagedResults from 'src/application/responseObjects/paged.results';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import IGetAllAsyncUseCase from 'src/application/useCases/generics/iget-all-async.use-case';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.useCase';

interface IAssociationService
  extends IGetAllAsyncUseCase<Association>,
    IGetByIdAsyncUseCase<Association, string> {
  createAssociation(
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  getAll(): Promise<Array<Association>>;
  getPagedAssociations(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<Association>>;
  getById(id: string): Promise<Association>;
  updateAssociation(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  deleteAssociation(id: string): Promise<void>;
}

const IAssociationService = Symbol('IAssociationService');

export default IAssociationService;
