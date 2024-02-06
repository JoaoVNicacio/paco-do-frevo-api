import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import OtherFrevoEntity from '../entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import PagedResults from 'src/application/responseObjects/paged.results';

interface IOtherFrevoEntityService {
  createOtherFrevoEntity(
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>>;
  getAllOtherFrevoEntities(): Promise<Array<OtherFrevoEntity>>;
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
