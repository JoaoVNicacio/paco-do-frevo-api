import { Injectable } from '@nestjs/common';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social_network.dto';
import SocialNetworkMapper from 'src/application/mappers/social-network.mapper';
import PagedResults from 'src/application/responseObjects/paged.results';
import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';
import ISocialNetworkService from 'src/domain/services/Isocial_network.service';
import SocialNetworkRepository from 'src/infra/repositories/social_network.repository';

@Injectable()
class SocialNetworkService implements ISocialNetworkService {
  constructor(
    private readonly _socialNetworkRepository: SocialNetworkRepository,
    private readonly _socialNetworkMapper: SocialNetworkMapper,
  ) {}

  public async createSocialNetwork(
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    const socialNetwork =
      this._socialNetworkMapper.dtoToEntity(socialNetworkDTO);

    return this._socialNetworkRepository.createResume(socialNetwork);
  }

  public async getAllSocialNetwork(): Promise<Array<SocialNetwork>> {
    return await this._socialNetworkRepository.getAll();
  }

  public async getPagedSocialNetworks(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<SocialNetwork>> {
    const results = await this._socialNetworkRepository.getPagedSocialNetworks(
      page,
      pageSize,
    );

    const hasNextPage = results.total > page * pageSize;

    return new PagedResults(
      results.social_network,
      hasNextPage,
      page,
      pageSize,
    );
  }

  async getSocialNetworkById(id: string): Promise<SocialNetwork> {
    return this._socialNetworkRepository.getById(id);
  }

  public async updateSocialNetwork(
    id: string,
    social_DTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    const social_network = this._socialNetworkMapper.dtoToEntity(social_DTO);

    return await this._socialNetworkRepository.updateSocialNetwork(
      id,
      social_network,
    );
  }

  public async deleteSocialNetwork(id: string): Promise<void> {
    return await this._socialNetworkRepository.deleteSocialNetwork(id);
  }
}

export default SocialNetworkService;
