import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository as InjectDBAccessor } from '@nestjs/typeorm';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import { Repository as DBAccessor } from 'typeorm';

@Injectable()
class OtherFrevoEntityRepository implements IOtherFrevoEntityRepository {
  constructor(
    @InjectDBAccessor(OtherFrevoEntity)
    private _otherFrevoEntityDBAccessor: DBAccessor<OtherFrevoEntity>,
  ) {}

  public async createResume(
    otherFrevoEntity: OtherFrevoEntity,
  ): Promise<OtherFrevoEntity> {
    const createdOtherFrevoEntity =
      this._otherFrevoEntityDBAccessor.create(otherFrevoEntity);

    return await this._otherFrevoEntityDBAccessor.save(createdOtherFrevoEntity);
  }

  public async getAll(): Promise<Array<OtherFrevoEntity>> {
    return this._otherFrevoEntityDBAccessor.find();
  }

  public async getPagedOtherFrevoEntities(
    page: number,
    pageSize: number,
  ): Promise<{
    otherFrevoEntities: Array<OtherFrevoEntity>;
    total: number;
  }> {
    const queryBuilder =
      this._otherFrevoEntityDBAccessor.createQueryBuilder('otherFrevoEntity');

    const [otherFrevoEntities, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { otherFrevoEntities, total };
  }

  public async getById(id: string): Promise<OtherFrevoEntity> {
    return await this._otherFrevoEntityDBAccessor.findOne({
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
      throw new NotFoundException('Entidade do frevo não encontrada.');
    }

    this._otherFrevoEntityDBAccessor.merge(
      existingOtherFrevoEntity,
      otherFrevoEntity,
    );

    return await this._otherFrevoEntityDBAccessor.save(
      existingOtherFrevoEntity,
    );
  }

  public async deleteOtherFrevoEntity(id: string): Promise<void> {
    const result = await this._otherFrevoEntityDBAccessor.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Entidade do frevo não encontrada.');
    }
  }
}

export default OtherFrevoEntityRepository;
