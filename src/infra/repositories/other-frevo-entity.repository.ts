import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IOtherFrevoEntityRepository from 'src/domain/repositories/iother-frevo-entity.repository';
import { Repository } from 'typeorm';

@Injectable()
class OtherFrevoEntityRepository implements IOtherFrevoEntityRepository {
  constructor(
    @InjectRepository(OtherFrevoEntity)
    private _otherFrevoEntityRepository: Repository<OtherFrevoEntity>,
  ) {}

  public async createResume(
    otherFrevoEntity: OtherFrevoEntity,
  ): Promise<OtherFrevoEntity> {
    const createdOtherFrevoEntity =
      this._otherFrevoEntityRepository.create(otherFrevoEntity);

    return await this._otherFrevoEntityRepository.save(createdOtherFrevoEntity);
  }

  public async getAll(): Promise<Array<OtherFrevoEntity>> {
    return this._otherFrevoEntityRepository.find();
  }

  public async getPagedOtherFrevoEntities(
    page: number,
    pageSize: number,
  ): Promise<{
    otherFrevoEntitys: Array<OtherFrevoEntity>;
    total: number;
  }> {
    // eslint-disable-next-line prettier/prettier
    const queryBuilder = this._otherFrevoEntityRepository.createQueryBuilder('otherFrevoEntity');

    const [otherFrevoEntitys, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { otherFrevoEntitys, total };
  }

  public async getById(id: string): Promise<OtherFrevoEntity> {
    return await this._otherFrevoEntityRepository.findOne({
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

    this._otherFrevoEntityRepository.merge(
      existingOtherFrevoEntity,
      otherFrevoEntity,
    );

    return await this._otherFrevoEntityRepository.save(
      existingOtherFrevoEntity,
    );
  }

  public async deleteOtherFrevoEntity(id: string): Promise<void> {
    const result = await this._otherFrevoEntityRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Entidade do frevo não encontrada.');
    }
  }
}

export default OtherFrevoEntityRepository;
