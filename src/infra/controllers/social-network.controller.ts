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
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import SocialNetworkService from 'src/application/useCases/services/social-network.service';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SocialNetworks')
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
      const socialNetwork =
        await this.socialNetworkService.getAllSocialNetwork();

      return socialNetwork;
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
    @Body() socialNetwork_DTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    try {
      // eslint-disable-next-line prettier/prettier
      const updatedSocialNetwork =
        await this.socialNetworkService.updateSocialNetwork(
          id,
          socialNetwork_DTO,
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
