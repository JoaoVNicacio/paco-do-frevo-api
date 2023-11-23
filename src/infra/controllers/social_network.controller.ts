import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social_network.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import SocialNetworkService from 'src/application/useCases/services/social_network.service';
import SocialNetwork from 'src/domain/entities/associationAggregate/social_network.entity';
import ControllerBase from './controller.base';

@Controller('social-networks')
class SocialNetworkController extends ControllerBase {
  constructor(private readonly socialNetworkService: SocialNetworkService) {
    super();
  }

  @Post()
  public async createSocialNetwork(
    @Body() socialNetworkDTO: SocialNetworkDTO,
    @Param('associationId') associationId: string,
  ): Promise<SocialNetwork> {
    try {
      // eslint-disable-next-line prettier/prettier
      const createdSocialNetwork =
        await this.socialNetworkService.createSocialNetwork(
          socialNetworkDTO,
          associationId,
        );

      return this.sendCustomValidationResponse<SocialNetwork>(
        createdSocialNetwork,
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error creating the network');
    }
  }

  @Get()
  public async getAllSocialNetworks(): Promise<SocialNetwork[]> {
    try {
      const social_network =
        await this.socialNetworkService.getAllSocialNetwork();

      return social_network;
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error retriving the networks',
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
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error retrieving the networks',
      );
    }
  }

  @Get('id/:id')
  public async getById(@Param('id') id: string): Promise<SocialNetwork> {
    try {
      return this.sendCustomResponse(await this.getById(id));
      // eslint-disable-next-line prettier/prettier
    }
    catch(error){
      this.throwInternalError(error, 'There was an error creating the contact');
    }
  }

  @Put('id/:id')
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

      return this.sendCustomValidationResponse<SocialNetwork>(
        updatedSocialNetwork,
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error updating the network');
    }
  }

  @Delete('id/:id')
  public async deleteSocialNetwork(@Param('id') id: string): Promise<void> {
    try {
      await this.socialNetworkService.deleteSocialNetwork(id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error deleting the network');
    }
  }
}

export default SocialNetworkController;
