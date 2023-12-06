import OtherFrevoEntity from '../entities/otherFrevoMakersAggregate/other-frevo-entity.entity';

interface IOtherFrevoEntityRepository {
  createResume(otherFrevoEntity: OtherFrevoEntity): Promise<OtherFrevoEntity>;
  getAll(): Promise<Array<OtherFrevoEntity> | any>;
  getById(id: string): Promise<OtherFrevoEntity | undefined>;
  updateOtherFrevoEntity(
    id: string,
    otherFrevoEntity: OtherFrevoEntity,
  ): Promise<OtherFrevoEntity | undefined>;
  deleteOtherFrevoEntity(id: string): Promise<void>;
}

export default IOtherFrevoEntityRepository;
