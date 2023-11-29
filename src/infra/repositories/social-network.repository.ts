/* eslint-disable */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ISocialNetworkRepository from 'src/domain/repositories/isocial-network.repository';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';

@Injectable()
class SocialNetworkRepository implements ISocialNetworkRepository {
  constructor(
    @InjectRepository(SocialNetwork)
    private _socialNetworkRepository: Repository<SocialNetwork>,
  ) {}

  public async createSocialNetwork(
    social_network: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    const createdSocialNetwork =
      this._socialNetworkRepository.create(social_network);

    return await this._socialNetworkRepository.save(createdSocialNetwork);
  }

  public async getAll(): Promise<Array<SocialNetwork>> {
    return this._socialNetworkRepository.find();
  }

  public async getPagedSocialNetworks(
    page: number,
    pageSize: number,
  ): Promise<{
    socialNetwork: Array<SocialNetwork>;
    total: number;
  }> {
    // eslint-disable-next-line prettier/prettier
    const queryBuilder =
      this._socialNetworkRepository.createQueryBuilder('socialNetwork');

    const [socialNetwork, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { socialNetwork, total };
  }

  public async getById(id: string): Promise<SocialNetwork> {
    return this._socialNetworkRepository.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  public async updateSocialNetwork(
    id: string,
    social_network: SocialNetwork,
  ): Promise<SocialNetwork> {
    const existingSocialNetwork = await this.getById(id);

    if (!existingSocialNetwork) {
      throw new Error('Rede social não encontrada.');
    }

    this._socialNetworkRepository.merge(existingSocialNetwork, social_network);

    return this._socialNetworkRepository.save(existingSocialNetwork);
  }

  public async deleteSocialNetwork(id: string): Promise<void> {
    const result = await this._socialNetworkRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Rede social não encontrada.');
    }
  }
}

export default SocialNetworkRepository;
