import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import ISocialNetworkService from 'src/domain/services/isocial-network.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';

@ApiTags('SocialNetworks')
@Controller('social-networks')
class SocialNetworkController extends ControllerBase {
  constructor(
    @Inject(ISocialNetworkService)
    private readonly _socialNetworkService: ISocialNetworkService,
  ) {
    super();
  }

  @Post('association/:id')
  public async createSocialNetwork(
    @Body() socialNetworkDTO: SocialNetworkDTO,
    @Param() idParam: UUIDParam,
  ): Promise<SocialNetwork> {
    try {
      const createdSocialNetwork =
        await this._socialNetworkService.createSocialNetwork(
          socialNetworkDTO,
          idParam.id,
        );

      return this.sendCustomValidationResponse<SocialNetwork>(
        createdSocialNetwork,
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar network');
    }
  }

  @Get()
  public async getAllSocialNetworks(): Promise<Array<SocialNetwork>> {
    try {
      const socialNetwork =
        await this._socialNetworkService.getAllSocialNetworks();

      return socialNetwork;
    } catch (error) {
      this.throwInternalError(
        error,
        'There was an error retriving the networks',
      );
    }
  }

  @Get('id/:id')
  public async getById(
    @Param() idParam: UUIDParam,
  ): Promise<SocialNetwork> {
    try {
      return this.sendCustomResponse(
        await this._socialNetworkService.getSocialNetworkById(idParam.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar contact');
    }
  }

  @Put('id/:id')
  public async updateSocialNetwork(
    @Param() idParam: UUIDParam,
    @Body() socialNetwork_DTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    try {
      const updatedSocialNetwork =
        await this._socialNetworkService.updateSocialNetwork(
          idParam.id,
          socialNetwork_DTO,
        );

      return this.sendCustomValidationResponse<SocialNetwork>(
        updatedSocialNetwork,
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao atualizar network');
    }
  }

  @Delete('id/:id')
  public async deleteSocialNetwork(
    @Param() idParam: UUIDParam,
  ): Promise<void> {
    try {
      await this._socialNetworkService.deleteSocialNetwork(idParam.id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover network');
    }
  }
}

export default SocialNetworkController;
