import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Inject,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ControllerBase from './base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import PagingParams from '../../application/requestObjects/paging.params';
import UUIDParam from '../../application/requestObjects/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiPagedResultsResponse } from '../swaggerSchemas/paged-results.schema';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import AuthGuard from '../guards/auth.guard';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';
import AppAdminGuard from '../guards/app-admin.guard';
import { ApiForbiddenResponseWithSchema } from '../swaggerSchemas/forbidden.schema';
import TimeParser from 'src/application/utils/time.parser';
import AssociationAdminGuard from '../guards/association-admin.guard';
import IAssociationService from 'src/application/contracts/services/iassociation.service';

@ApiTags('Association')
@Controller('associations')
@UseGuards(AuthGuard)
@ApiUnauthorizedResponseWithSchema()
class AssociationController extends ControllerBase {
  constructor(
    @Inject(IAssociationService)
    private readonly _associationService: IAssociationService,
  ) {
    super();
  }

  @Post()
  @UseGuards(AssociationAdminGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Association,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiBody({
    description: 'The record data.',
    type: AssociationDTO,
  })
  public async createAssociation(
    @Body() associationDTO: AssociationDTO,
  ): Promise<Association> {
    return this.sendCustomValidationResponse<Association>(
      await this._associationService.createEntry(associationDTO),
    );
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(20))
  @ApiOkResponse({
    description: 'The records have been successfully fetched.',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(Association) },
    },
  })
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  public async getAllAssociations(): Promise<Array<Association>> {
    return this.sendCustomResponse(await this._associationService.getAll());
  }

  @Get('/paged')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(20))
  @ApiPagedResultsResponse(Association)
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiQuery({ name: 'page', description: 'The page index of the request' })
  @ApiQuery({ name: 'pageSize', description: 'The page size of the request' })
  public async getPagedAssociations(
    @Query() pagingParams: PagingParams,
  ): Promise<PagedResults<Association>> {
    return this.sendCustomResponse(
      await this._associationService.getPaged(
        Number(pagingParams.page),
        Number(pagingParams.pageSize),
      ),
    );
  }

  @Get('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(20))
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: Association,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getAssociationById(
    @Param() idParam: UUIDParam,
  ): Promise<Association> {
    return this.sendCustomResponse<Association>(
      await this._associationService.getById(idParam.id),
    );
  }

  @Put('id/:id')
  @UseGuards(AssociationAdminGuard)
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: Association,
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
    type: AssociationDTO,
  })
  public async updateAssociation(
    @Param() idParam: UUIDParam,
    @Body() associationDTO: AssociationDTO,
  ): Promise<Association> {
    return this.sendCustomValidationResponse<Association>(
      await this._associationService.updateEntryById(
        idParam.id,
        associationDTO,
      ),
    );
  }

  @Delete('id/:id')
  @UseGuards(AppAdminGuard)
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: null,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiForbiddenResponseWithSchema()
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async deleteAssociation(@Param() idParam: UUIDParam): Promise<void> {
    await this._associationService.deleteEntryById(idParam.id);
  }
}

export default AssociationController;
