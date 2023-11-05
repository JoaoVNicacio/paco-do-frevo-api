/* eslint-disable */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ISocialNetworkRepository from 'src/domain/repositories/isocial_network.repository';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social_network.dto';
import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';


@Injectable()
class SocialNetowrkRepository implements ISocialNetworkRepository {
  constructor(
    @InjectRepository(SocialNetwork)
    private _social_networkRepository: Repository<SocialNetwork>,
  ) {}
    deleteSocialNetwork(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

  public async createResume(social_network: SocialNetworkDTO): Promise<SocialNetwork> {
    const createdSocialNetwork = this._social_networkRepository.create(social_network);

    return await this._social_networkRepository.save(createdSocialNetwork);
  }

  public async getAll(): Promise<Array<SocialNetwork>> {
    return this._social_networkRepository.find();
  }

  public async getPagedSocialNetworks(
    page: number,
    pageSize: number,
  ): Promise<{
    social_network: Array<SocialNetwork>;
    total: number;
  }> {
    // eslint-disable-next-line prettier/prettier
    const queryBuilder = this._social_networkRepository.createQueryBuilder('social_network');

    const [social_network, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { social_network, total };
  }

  public async getById(id: string): Promise<SocialNetwork> {
    return this._social_networkRepository.findOne({
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

    this._social_networkRepository.merge(existingSocialNetwork, social_network);

    return this._social_networkRepository.save(existingSocialNetwork);
  }

  public async deleteAssociation(id: string): Promise<void> {
    const result = await this._social_networkRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Rede social não encontrada.');
    }
  }
}

export default SocialNetowrkRepository;
