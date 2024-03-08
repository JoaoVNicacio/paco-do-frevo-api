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
import UUIDParam from 'src/application/requestObjects/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import TimeParser from 'src/application/utils/time.parser';
import ISocialNetworkService from 'src/application/contracts/services/isocial-network.service';

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
    return this.sendCustomValidationResponse<SocialNetwork>(
      await this._socialNetworkService.createSocialNetwork(
        socialNetworkDTO,
        idParam.id,
      ),
    );
  }

  @Get('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromMinutesToMilliseconds(1))
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
    return this.sendCustomResponse(
      await this._socialNetworkService.getSocialNetworkById(idParam.id),
    );
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
    return this.sendCustomValidationResponse<SocialNetwork>(
      await this._socialNetworkService.updateSocialNetwork(
        idParam.id,
        socialNetworkDTO,
      ),
    );
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
    await this._socialNetworkService.deleteSocialNetwork(idParam.id);
  }
}

export default SocialNetworkController;
