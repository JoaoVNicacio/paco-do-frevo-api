import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import PagedResults from 'src/application/responseObjects/paged.results';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IGetAllAsyncUseCase from 'src/application/useCases/generics/iget-all-async.use-case';

interface IOtherFrevoEntityService
  extends IGetAllAsyncUseCase<OtherFrevoEntity> {
  createOtherFrevoEntity(
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>>;
  getAll(): Promise<Array<OtherFrevoEntity>>;
  getOtherFrevoEntityById(id: string): Promise<OtherFrevoEntity>;
  getPagedOtherFrevoEntities(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<OtherFrevoEntity>>;
  updateOtherFrevoEntity(
    id: string,
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>>;
  deleteOtherFrevoEntity(id: string): Promise<void>;
}

const IOtherFrevoEntityService = Symbol('IOtherFrevoEntityService');

export default IOtherFrevoEntityService;
