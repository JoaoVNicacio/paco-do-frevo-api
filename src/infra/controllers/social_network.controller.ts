import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social_network.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import SocialNetworkService from 'src/application/useCases/services/social_network.service';
import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';

@Controller('social-networks')
class SocialNetworkController {
  constructor(private readonly socialNetworkService: SocialNetworkService) {}

  @Post()
  public async createSocialNetwork(
    @Body() social_networkDTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    try {
      // eslint-disable-next-line prettier/prettier
      const createdSocialNetwork =
        await this.socialNetworkService.createSocialNetwork(social_networkDTO);

      return createdSocialNetwork;
      // eslint-disable-next-line prettier/prettier
    } catch (error) {
      throw new HttpException(
        'Erro ao criar uma rede social',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public async getAllSocialNetworks(): Promise<SocialNetwork[]> {
    try {
      const social_network =
        await this.socialNetworkService.getAllSocialNetwork();

      return social_network;
      // eslint-disable-next-line prettier/prettier
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar redes sociais',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('paged')
  public async getPagedSocialNetworks(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<PagedResults<SocialNetwork>> {
    try {
      const result = await this.socialNetworkService.getPagedSocialNetworks(
        page,
        pageSize,
      );

      return result;
      // eslint-disable-next-line prettier/prettier
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar redes sociais',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<SocialNetwork> {
    const social_network = await this.getById(id);

    if (!social_network) {
      throw new HttpException(
        'Rede social não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return social_network;
  }

  @Put(':id')
  public async updateSocialNetwork(
    @Param('id') id: string,
    @Body() social_network_DTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    try {
      // eslint-disable-next-line prettier/prettier
      const updatedSocialNetwork =
        await this.socialNetworkService.updateSocialNetwork(
          id,
          social_network_DTO,
        );

      return updatedSocialNetwork;
      // eslint-disable-next-line prettier/prettier
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar uma rede social.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public async deleteSocialNetwork(@Param('id') id: string): Promise<void> {
    try {
      await this.socialNetworkService.deleteSocialNetwork(id);
      // eslint-disable-next-line prettier/prettier
    } catch (error) {
      throw new HttpException(
        'Erro ao excluir uma rede social.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default SocialNetworkController;
