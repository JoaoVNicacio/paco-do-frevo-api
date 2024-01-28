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
  ApiNotFoundResponse,
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

@ApiTags('Association')
@Controller('associations')
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
    description: 'The record has an error on the sent object.',
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
      const createdAssociation =
        await this._associationService.createAssociation(associationDTO);

      return this.sendCustomValidationResponse<Association>(createdAssociation);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar association');
    }
  }

  @Get()
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
  @ApiPagedResultsResponse(Association)
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
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
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: Association,
  })
  @ApiNotFoundResponse({
    description: 'The record was not found.',
    type: String,
  })
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
    description: 'The record has an error on the sent object.',
    type: ValidationErrorDTO,
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
      const updatedAssociation =
        await this._associationService.updateAssociation(
          idParam.id,
          associationDTO,
        );

      return this.sendCustomValidationResponse<Association>(updatedAssociation);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao editar association');
    }
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Object,
  })
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
