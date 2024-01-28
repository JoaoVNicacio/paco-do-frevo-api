/* eslint-disable */
import { InjectRepository as InjectContext } from '@nestjs/typeorm';
import { Repository as DBContext } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ISocialNetworkRepository from 'src/domain/repositories/isocial-network.repository';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';

@Injectable()
class SocialNetworkRepository implements ISocialNetworkRepository {
  constructor(
    @InjectContext(SocialNetwork)
    private readonly _socialNetworkContext: DBContext<SocialNetwork>,
  ) {}

  public async createSocialNetwork(
    socialNetwork: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    const createdSocialNetwork =
      this._socialNetworkContext.create(socialNetwork);

    return await this._socialNetworkContext.save(createdSocialNetwork);
  }

  public async getAll(): Promise<Array<SocialNetwork>> {
    return this._socialNetworkContext.find();
  }

  public async getPagedSocialNetworks(
    page: number,
    pageSize: number,
  ): Promise<{
    socialNetwork: Array<SocialNetwork>;
    total: number;
  }> {
    const queryBuilder =
      this._socialNetworkContext.createQueryBuilder('socialNetwork');

    const [socialNetwork, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { socialNetwork, total };
  }

  public async getById(id: string): Promise<SocialNetwork> {
    return this._socialNetworkContext.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  public async updateSocialNetwork(
    id: string,
    socialNetwork: SocialNetwork,
  ): Promise<SocialNetwork> {
    const existingSocialNetwork = await this.getById(id);

    if (!existingSocialNetwork) {
      throw new Error('Rede social não encontrada.');
    }

    this._socialNetworkContext.merge(existingSocialNetwork, socialNetwork);

    return this._socialNetworkContext.save(existingSocialNetwork);
  }

  public async deleteSocialNetwork(id: string): Promise<void> {
    const result = await this._socialNetworkContext.delete(id);

    if (result.affected === 0) {
      throw new Error('Rede social não encontrada.');
    }
  }
}

export default SocialNetworkRepository;
