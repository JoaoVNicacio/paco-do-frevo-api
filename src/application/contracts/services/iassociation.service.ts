import ValidationResponse from 'src/shared/responseObjects/validation.response';
import PagedResults from 'src/shared/responseObjects/paged.results';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import IGetAllAsyncUseCase from 'src/application/useCases/generics/iget-all-async.use-case';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import IGetPagedAsyncUseCase from 'src/application/useCases/generics/iget-paged-async.use-case';
import ICreateEntryAsyncUseCase from 'src/application/useCases/generics/icreate-entry.use-case';
import IUpdateEntryAsyncUseCase from 'src/application/useCases/generics/iupdate-entry.use-case';
import IDeleteEntryAsyncUseCase from 'src/application/useCases/generics/idelete-entry.use-case';
import AssociationFilteringParam from 'src/shared/requestObjects/params/association.filtering-param';
import SimplifiedAssociationDTO from 'src/application/dtos/associationDtos/simplified-association.dto';
import EOrderingParam from 'src/shared/requestObjects/params/enums/eordering.param';

interface IAssociationService
  extends IGetAllAsyncUseCase<
      SimplifiedAssociationDTO,
      AssociationFilteringParam
    >,
    IGetByIdAsyncUseCase<Association, string>,
    IGetPagedAsyncUseCase<SimplifiedAssociationDTO, AssociationFilteringParam>,
    ICreateEntryAsyncUseCase<Association, AssociationDTO>,
    IUpdateEntryAsyncUseCase<Association, AssociationDTO, string>,
    IDeleteEntryAsyncUseCase<string> {
  createEntry(
    associationDTO: AssociationDTO,
    userId?: string,
  ): Promise<ValidationResponse<Association>>;
  getAll(
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<Array<SimplifiedAssociationDTO>>;
  getPaged(
    page: number,
    pageSize: number,
    filterParams?: AssociationFilteringParam,
    orderingParam?: EOrderingParam,
  ): Promise<PagedResults<SimplifiedAssociationDTO>>;
  getById(id: string): Promise<Association>;
  updateEntryById(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<ValidationResponse<Association>>;
  deleteEntryById(id: string): Promise<void>;
}

const IAssociationService = Symbol('IAssociationService');

export default IAssociationService;
