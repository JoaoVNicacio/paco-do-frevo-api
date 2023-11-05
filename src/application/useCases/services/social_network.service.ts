import { Injectable } from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social_network.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';
import ISocialNetowrkService from 'src/domain/services/Isocial_network.service';
import SocialNetowrkRepository from 'src/infra/repositories/social_network.repository';

@Injectable()
class SocialNetWorkService implements ISocialNetowrkService {
  constructor(
    private readonly _socialNetworkRepository: SocialNetowrkRepository,
  ) {}

  public async createSocialNetwork(
    socialNetworkDTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    const phoneNumber =
      this._socialNetworkRepository.dtoToEntity(socialNetworkDTO);

    return this._socialNetworkRepository.createResume(phoneNumber);
  }

  public async getAllAssociations(): Promise<Array<Association>> {
    return await this._associationRepository.getAll();
  }

  public async getPagedAssociations(
    page: number,
    pageSize: number,
  ): Promise<PagedResults<Association>> {
    const results = await this._associationRepository.getPagedAssociations(
      page,
      pageSize,
    );

    const hasNextPage = results.total > page * pageSize;

    return new PagedResults(results.associations, hasNextPage, page, pageSize);
  }

  async getAssociationById(id: string): Promise<Association> {
    return this._associationRepository.getById(id);
  }

  public async updateAssociation(
    id: string,
    associationDTO: AssociationDTO,
  ): Promise<Association> {
    const association = this._associationMapper.dtoToEntity(associationDTO);

    return await this._socialNetworkRepository.updateAssociation(
      id,
      association,
    );
  }

  public async deleteAssociation(id: string): Promise<void> {
    return await this._socialNetworkRepository.deleteAssociation(id);
  }
}

export default SocialNetWorkService;
