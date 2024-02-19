import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import SocialNetworkDTO from 'src/application/dtos/associationDtos/social-network.dto';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import ControllerBase from './base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import ISocialNetworkService from 'src/domain/services/isocial-network.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import AuthGuard from '../guards/auth.guard';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';

@ApiTags('SocialNetworks')
@Controller('social-networks')
@UseGuards(AuthGuard)
@ApiUnauthorizedResponseWithSchema()
class SocialNetworkController extends ControllerBase {
  constructor(
    @Inject(ISocialNetworkService)
    private readonly _socialNetworkService: ISocialNetworkService,
  ) {
    super();
  }

  @Post('association/:id')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: SocialNetwork,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: SocialNetworkDTO,
  })
  public async createSocialNetwork(
    @Body() socialNetworkDTO: SocialNetworkDTO,
    @Param() idParam: UUIDParam,
  ): Promise<SocialNetwork> {
    try {
      return this.sendCustomValidationResponse<SocialNetwork>(
        await this._socialNetworkService.createSocialNetwork(
          socialNetworkDTO,
          idParam.id,
        ),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar network');
    }
  }

  @Get('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(20000)
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: SocialNetwork,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getById(@Param() idParam: UUIDParam): Promise<SocialNetwork> {
    try {
      return this.sendCustomResponse(
        await this._socialNetworkService.getSocialNetworkById(idParam.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar contact');
    }
  }

  @Put('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: SocialNetwork,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: SocialNetworkDTO,
  })
  public async updateSocialNetwork(
    @Param() idParam: UUIDParam,
    @Body() socialNetworkDTO: SocialNetworkDTO,
  ): Promise<SocialNetwork> {
    try {
      return this.sendCustomValidationResponse<SocialNetwork>(
        await this._socialNetworkService.updateSocialNetwork(
          idParam.id,
          socialNetworkDTO,
        ),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao atualizar network');
    }
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Object,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiNotFoundResponseWithSchema()
  public async deleteSocialNetwork(@Param() idParam: UUIDParam): Promise<void> {
    try {
      await this._socialNetworkService.deleteSocialNetwork(idParam.id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover network');
    }
  }
}

export default SocialNetworkController;
