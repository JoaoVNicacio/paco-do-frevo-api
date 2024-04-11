import ValidationResponse from 'src/application/responseObjects/validation.response';
import PagedResults from 'src/application/responseObjects/paged.results';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import IGetAllAsyncUseCase from 'src/application/useCases/generics/iget-all-async.use-case';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import IGetPagedAsyncUseCase from 'src/application/useCases/generics/iget-paged-async.use-case';
import ICreateEntryAsyncUseCase from 'src/application/useCases/generics/icreate-entry.use-case';
import IUpdateEntryAsyncUseCase from 'src/application/useCases/generics/iupdate-entry.use-case';
import IDeleteEntryAsyncUseCase from 'src/application/useCases/generics/idelete-entry.use-case';

interface IAssociationService
  extends IGetAllAsyncUseCase<Association>,
    IGetByIdAsyncUseCase<Association, string>,
    IGetPagedAsyncUseCase<Association>,
    ICreateEntryAsyncUseCase<Association, AssociationDTO>,
    IUpdateEntryAsyncUseCase<Association, AssociationDTO, string>,
    IDeleteEntryAsyncUseCase<string> {
  createEntry(
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  getAll(): Promise<Array<Association>>;
  getPaged(page: number, pageSize: number): Promise<PagedResults<Association>>;
  getById(id: string): Promise<Association>;
  updateEntryById(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  deleteEntryById(id: string): Promise<void>;
}

const IAssociationService = Symbol('IAssociationService');

export default IAssociationService;
