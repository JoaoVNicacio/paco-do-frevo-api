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
} from '@nestjs/common';
import PagedResults from 'src/application/responseObjects/paged.results';
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
import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import PagingParams from 'src/application/requestObjects/paging.params';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiPagedResultsResponse } from '../swaggerSchemas/paged-results.schema';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import TimeParser from 'src/application/utils/time.parser';
import IOtherFrevoEntityService from 'src/application/contracts/services/iother-frevo-entity.service';

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
    description: 'The request has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiBody({
    description: 'The record data.',
    type: OtherFrevoEntityDTO,
  })
  public async createOtherFrevoEntity(
    @Body() otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<OtherFrevoEntity> {
    return this.sendCustomValidationResponse<OtherFrevoEntity>(
      await this._otherFrevoEntityService.createEntry(otherFrevoEntityDTO),
    );
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(20))
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
    return this.sendCustomResponse(
      await this._otherFrevoEntityService.getAll(),
    );
  }

  @Get('/paged')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(20))
  @ApiPagedResultsResponse(OtherFrevoEntity)
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiQuery({ name: 'page', description: 'The page index of the request' })
  @ApiQuery({ name: 'pageSize', description: 'The page size of the request' })
  public async getPagedOtherFrevoEntities(
    @Query() pagingParams: PagingParams,
  ): Promise<PagedResults<OtherFrevoEntity>> {
    return this.sendCustomResponse(
      await this._otherFrevoEntityService.getPaged(
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
    type: OtherFrevoEntity,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getOtherFrevoEntityById(
    @Param() idParam: UUIDParam,
  ): Promise<OtherFrevoEntity> {
    return this.sendCustomResponse<OtherFrevoEntity>(
      await this._otherFrevoEntityService.getById(idParam.id),
    );
  }

  @Put('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: OtherFrevoEntity,
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
    type: OtherFrevoEntityDTO,
  })
  public async updateOtherFrevoEntity(
    @Param() idParam: UUIDParam,
    @Body() otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<OtherFrevoEntity> {
    return this.sendCustomValidationResponse<OtherFrevoEntity>(
      await this._otherFrevoEntityService.updateEntryById(
        idParam.id,
        otherFrevoEntityDTO,
      ),
    );
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
  public async deleteOtherFrevoEntity(
    @Param() idParam: UUIDParam,
  ): Promise<void> {
    await this._otherFrevoEntityService.deleteEntryById(idParam.id);
  }
}

export default OtherFrevoEntityController;
