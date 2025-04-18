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
import SocialNetwork from 'src/domain/aggregates/associationAggregate/social-network.entity';
import ControllerBase from '../../core/controllers/base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import AuthGuard from '../guards/auth.guard';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';
import AssociationAdminGuard from '../guards/association-admin.guard';
import TimeParser from 'src/shared/utils/time.parser';
import ISocialNetworkService from 'src/application/contracts/services/isocial-network.service';
import { ValidationPipeResponseRepresentation } from 'src/shared/valueRepresentations/values.representations';
import UUIDParam from 'src/shared/requestObjects/params/uuid.param';

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
  @UseGuards(AssociationAdminGuard)
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
    return this.customHttpResponse<SocialNetwork>(
      await this._socialNetworkService.createEntry(
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
    return this.customHttpResponse(
      await this._socialNetworkService.getById(idParam.id),
    );
  }

  @Put('id/:id')
  @UseGuards(AssociationAdminGuard)
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
    return this.customHttpResponse<SocialNetwork>(
      await this._socialNetworkService.updateEntryById(
        idParam.id,
        socialNetworkDTO,
      ),
    );
  }

  @Delete('id/:id')
  @UseGuards(AssociationAdminGuard)
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
    await this._socialNetworkService.deleteEntryById(idParam.id);
  }
}

export default SocialNetworkController;
