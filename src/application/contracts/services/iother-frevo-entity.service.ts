import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import PagedResults from 'src/application/responseObjects/paged.results';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IGetAllAsyncUseCase from 'src/application/useCases/generics/iget-all-async.use-case';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import IDeleteEntryAsyncUseCase from 'src/application/useCases/generics/delete-entry.use-case';
import ICreateEntryAsyncUseCase from 'src/application/useCases/generics/icreate-entry.use-case';
import IGetPagedAsyncUseCase from 'src/application/useCases/generics/iget-paged-async.use-case';
import IUpdateEntryAsyncUseCase from 'src/application/useCases/generics/iupdate-entry.use-case';

interface IOtherFrevoEntityService
  extends IGetAllAsyncUseCase<OtherFrevoEntity>,
    IGetByIdAsyncUseCase<OtherFrevoEntity, string>,
    IGetPagedAsyncUseCase<OtherFrevoEntity>,
    ICreateEntryAsyncUseCase<OtherFrevoEntity, OtherFrevoEntityDTO>,
    IUpdateEntryAsyncUseCase<OtherFrevoEntity, OtherFrevoEntityDTO, string>,
    IDeleteEntryAsyncUseCase<string> {
  createEntry(
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>>;
  getAll(): Promise<Array<OtherFrevoEntity>>;
  getById(id: string): Promise<OtherFrevoEntity>;
  getPaged(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<OtherFrevoEntity>>;
  updateEntryById(
    id: string,
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>>;
  deleteEntryById(id: string): Promise<void>;
}

const IOtherFrevoEntityService = Symbol('IOtherFrevoEntityService');

export default IOtherFrevoEntityService;
