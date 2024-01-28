import { Injectable } from '@nestjs/common';
import { InjectRepository as InjectContext } from '@nestjs/typeorm';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import { Repository as DBContext } from 'typeorm';

@Injectable()
class OtherFrevoEntityRepository implements IOtherFrevoEntityRepository {
  constructor(
    @InjectContext(OtherFrevoEntity)
    private _otherFrevoEntityContext: DBContext<OtherFrevoEntity>,
  ) {}

  public async createResume(
    otherFrevoEntity: OtherFrevoEntity,
  ): Promise<OtherFrevoEntity> {
    const createdOtherFrevoEntity =
      this._otherFrevoEntityContext.create(otherFrevoEntity);

    return await this._otherFrevoEntityContext.save(createdOtherFrevoEntity);
  }

  public async getAll(): Promise<Array<OtherFrevoEntity>> {
    return this._otherFrevoEntityContext.find();
  }

  public async getPagedOtherFrevoEntities(
    page: number,
    pageSize: number,
  ): Promise<{
    otherFrevoEntitys: Array<OtherFrevoEntity>;
    total: number;
  }> {
    const queryBuilder =
      this._otherFrevoEntityContext.createQueryBuilder('otherFrevoEntity');

    const [otherFrevoEntitys, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { otherFrevoEntitys, total };
  }

  public async getById(id: string): Promise<OtherFrevoEntity> {
    return await this._otherFrevoEntityContext.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  public async updateOtherFrevoEntity(
    id: string,
    otherFrevoEntity: OtherFrevoEntity,
  ): Promise<OtherFrevoEntity> {
    const existingOtherFrevoEntity = await this.getById(id);

    if (!existingOtherFrevoEntity) {
      throw new Error('Entidade do frevo não encontrada.');
    }

    this._otherFrevoEntityContext.merge(
      existingOtherFrevoEntity,
      otherFrevoEntity,
    );

    return await this._otherFrevoEntityContext.save(existingOtherFrevoEntity);
  }

  public async deleteOtherFrevoEntity(id: string): Promise<void> {
    const result = await this._otherFrevoEntityContext.delete(id);

    if (result.affected === 0) {
      throw new Error('Entidade do frevo não encontrada.');
    }
  }
}

export default OtherFrevoEntityRepository;
