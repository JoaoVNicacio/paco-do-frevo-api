import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import OtherFrevoEntity from '../entities/otherFrevoMakersAggregate/other-frevo-entity.entity';

interface IOtherFrevoEntityService {
  createOtherFrevoEntity(
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>>;
  getAllOtherFrevoEntities(): Promise<Array<OtherFrevoEntity>>;
  getOtherFrevoEntityById(id: string): Promise<OtherFrevoEntity>;
  updateOtherFrevoEntity(
    id: string,
    otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<ValidationResponse<OtherFrevoEntity>>;
  deleteOtherFrevoEntity(id: string): Promise<void>;
}

export default IOtherFrevoEntityService;
