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
import PagedResults from 'src/application/responseObjects/paged.results';
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
import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IOtherFrevoEntityService from 'src/domain/services/iother-frevo-entity.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import PagingParams from 'src/application/requestObjects/paging.params';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiPagedResultsResponse } from '../swaggerSchemas/paged-results.schema';

@ApiTags('OtherFrevoEntity')
@Controller('other-frevo-entities')
class OtherFrevoEntityController extends ControllerBase {
  constructor(
    @Inject(IOtherFrevoEntityService)
    private readonly _otherFrevoEntityService: IOtherFrevoEntityService,
  ) {
    super();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: OtherFrevoEntity,
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiBody({
    description: 'The record data.',
    type: OtherFrevoEntityDTO,
  })
  public async createOtherFrevoEntity(
    @Body() otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<OtherFrevoEntity> {
    try {
      const createdOtherFrevoEntity =
        await this._otherFrevoEntityService.createOtherFrevoEntity(
          otherFrevoEntityDTO,
        );

      return this.sendCustomValidationResponse<OtherFrevoEntity>(
        createdOtherFrevoEntity,
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar otherFrevoEntity');
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'The records have been successfully fetched.',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(OtherFrevoEntity) },
    },
  })
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  public async getAllOtherFrevoEntities(): Promise<Array<OtherFrevoEntity>> {
    try {
      return this.sendCustomResponse(
        await this._otherFrevoEntityService.getAllOtherFrevoEntities(),
      );
    } catch (error) {
      this.throwInternalError(
        error,
        'houve um erro ao obter otherFrevoEntities',
      );
    }
  }

  @Get('/paged')
  @ApiPagedResultsResponse(OtherFrevoEntity)
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiQuery({ name: 'page', description: 'The page index of the request' })
  @ApiQuery({ name: 'pageSize', description: 'The page size of the request' })
  public async getPagedOtherFrevoEntities(
    @Query() pagingParams: PagingParams,
  ): Promise<PagedResults<OtherFrevoEntity>> {
    try {
      return this.sendCustomResponse(
        await this._otherFrevoEntityService.getPagedOtherFrevoEntities(
          pagingParams.page,
          pagingParams.pageSize,
        ),
      );
    } catch (error) {
      this.throwInternalError(
        error,
        'houve um erro ao obter otherFrevoEntities',
      );
    }
  }

  @Get('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: OtherFrevoEntity,
  })
  @ApiNotFoundResponse({
    description: 'The record was not found.',
    type: String,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getOtherFrevoEntityById(
    @Param() idParam: UUIDParam,
  ): Promise<OtherFrevoEntity> {
    try {
      return this.sendCustomResponse<OtherFrevoEntity>(
        await this._otherFrevoEntityService.getOtherFrevoEntityById(idParam.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao obter otherFrevoEntity');
    }
  }

  @Put('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: OtherFrevoEntity,
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: OtherFrevoEntityDTO,
  })
  public async updateOtherFrevoEntity(
    @Param() idParam: UUIDParam,
    @Body() otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<OtherFrevoEntity> {
    try {
      const updatedOtherFrevoEntity =
        await this._otherFrevoEntityService.updateOtherFrevoEntity(
          idParam.id,
          otherFrevoEntityDTO,
        );

      return this.sendCustomValidationResponse<OtherFrevoEntity>(
        updatedOtherFrevoEntity,
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar otherFrevoEntity');
    }
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Object,
  })
  public async deleteOtherFrevoEntity(
    @Param() idParam: UUIDParam,
  ): Promise<void> {
    try {
      await this._otherFrevoEntityService.deleteOtherFrevoEntity(idParam.id);
    } catch (error) {
      this.throwInternalError(
        error,
        'houve um erro ao remover otherFrevoEntity',
      );
    }
  }
}

export default OtherFrevoEntityController;
