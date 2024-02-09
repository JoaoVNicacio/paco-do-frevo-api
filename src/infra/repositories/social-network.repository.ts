import { InjectRepository as InjectDBAccessor } from '@nestjs/typeorm';
import { Repository as DBAccessor } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import ISocialNetworkRepository from 'src/domain/repositories/isocial-network.repository';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';

@Injectable()
class SocialNetworkRepository implements ISocialNetworkRepository {
  constructor(
    @InjectDBAccessor(SocialNetwork)
    private readonly _socialNetworkDBAccessor: DBAccessor<SocialNetwork>,
  ) {}

  public async createSocialNetwork(
    socialNetwork: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    const createdSocialNetwork =
      this._socialNetworkDBAccessor.create(socialNetwork);

    return await this._socialNetworkDBAccessor.save(createdSocialNetwork);
  }

  public async getAll(): Promise<Array<SocialNetwork>> {
    return this._socialNetworkDBAccessor.find();
  }

  public async getPagedSocialNetworks(
    page: number,
    pageSize: number,
  ): Promise<{
    socialNetwork: Array<SocialNetwork>;
    total: number;
  }> {
    const queryBuilder =
      this._socialNetworkDBAccessor.createQueryBuilder('socialNetwork');

    const [socialNetwork, total] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { socialNetwork, total };
  }

  public async getById(id: string): Promise<SocialNetwork> {
    return this._socialNetworkDBAccessor.findOne({
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
      throw new NotFoundException('Rede social não encontrada.');
    }

    this._socialNetworkDBAccessor.merge(existingSocialNetwork, socialNetwork);

    return this._socialNetworkDBAccessor.save(existingSocialNetwork);
  }

  public async deleteSocialNetwork(id: string): Promise<void> {
    const result = await this._socialNetworkDBAccessor.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Rede social não encontrada.');
    }
  }
}

export default SocialNetworkRepository;
