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
import IAssociationService from 'src/domain/services/iassociation.service';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiPagedResultsResponse } from '../swaggerSchemas/paged-results.schema';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import AuthGuard from '../guards/auth.guard';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';

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
    try {
      return this.sendCustomValidationResponse<Association>(
        await this._associationService.createAssociation(associationDTO),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar association');
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(5000)
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
    try {
      return this.sendCustomResponse(
        await this._associationService.getAllAssociations(),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao obter associations');
    }
  }

  @Get('/paged')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(20000)
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
    try {
      return this.sendCustomResponse(
        await this._associationService.getPagedAssociations(
          Number(pagingParams.page),
          Number(pagingParams.pageSize),
        ),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao obter associations');
    }
  }

  @Get('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30000)
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
    try {
      return this.sendCustomResponse<Association>(
        await this._associationService.getAssociationById(idParam.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao obter association');
    }
  }

  @Put('id/:id')
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
    try {
      return this.sendCustomValidationResponse<Association>(
        await this._associationService.updateAssociation(
          idParam.id,
          associationDTO,
        ),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao editar association');
    }
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: null,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async deleteAssociation(@Param() idParam: UUIDParam): Promise<void> {
    try {
      await this._associationService.deleteAssociation(idParam.id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover association');
    }
  }
}

export default AssociationController;
