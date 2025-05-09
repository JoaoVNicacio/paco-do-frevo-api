import OtherFrevoEntity from '../aggregates/otherFrevoMakersAggregate/other-frevo-entity.entity';

interface IOtherFrevoEntityRepository {
  createOtherFrevoEntity(
    otherFrevoEntity: OtherFrevoEntity,
  ): Promise<OtherFrevoEntity>;
  getAll(): Promise<Array<OtherFrevoEntity> | any>;
  getById(id: string): Promise<OtherFrevoEntity | undefined>;
  getPagedOtherFrevoEntities(
    page: number,
    pageSize: number,
  ): Promise<{
    otherFrevoEntities: Array<OtherFrevoEntity>;
    total: number;
  }>;
  updateOtherFrevoEntity(
    id: string,
    otherFrevoEntity: OtherFrevoEntity,
  ): Promise<OtherFrevoEntity | undefined>;
  deleteOtherFrevoEntity(id: string): Promise<void>;
}

const IOtherFrevoEntityRepository = Symbol('IOtherFrevoEntityRepository');

export default IOtherFrevoEntityRepository;
