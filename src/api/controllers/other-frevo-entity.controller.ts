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
import PagedResults from 'src/shared/responseObjects/paged.results';
import ControllerBase from '../../core/controllers/base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import OtherFrevoEntity from 'src/domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity.entity';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiPagedResultsResponse } from '../swaggerSchemas/paged-results.schema';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import AuthGuard from '../guards/auth.guard';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';
import AppAdminGuard from '../guards/app-admin.guard';
import { ApiForbiddenResponseWithSchema } from '../swaggerSchemas/forbidden.schema';
import AssociationAdminGuard from '../guards/association-admin.guard';
import TimeParser from 'src/shared/utils/time.parser';
import IOtherFrevoEntityService from 'src/application/contracts/services/iother-frevo-entity.service';
import { ValidationPipeResponseRepresentation } from 'src/shared/valueRepresentations/values.representations';
import PagingParams from 'src/shared/requestObjects/params/paging.params';
import UUIDParam from 'src/shared/requestObjects/params/uuid.param';
import {
  PageIndexQuery,
  PageSizeQuery,
} from '../decorators/paging-params.decorator';
import PagingParamsPipe from 'src/application/pipes/paging-results.pipe';

@ApiTags('OtherFrevoEntity')
@Controller('other-frevo-entities')
@UseGuards(AuthGuard)
@ApiUnauthorizedResponseWithSchema()
class OtherFrevoEntityController extends ControllerBase {
  constructor(
    @Inject(IOtherFrevoEntityService)
    private readonly _otherFrevoEntityService: IOtherFrevoEntityService,
  ) {
    super();
  }

  @Post()
  @UseGuards(AssociationAdminGuard)
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
    return this.customHttpResponse<OtherFrevoEntity>(
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
    return this.customHttpResponse(
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
  @PageIndexQuery()
  @PageSizeQuery()
  public async getPagedOtherFrevoEntities(
    @Query(PagingParamsPipe) pagingParams: PagingParams,
  ): Promise<PagedResults<OtherFrevoEntity>> {
    return this.customHttpResponse(
      await this._otherFrevoEntityService.getPaged(
        pagingParams.page,
        pagingParams.pageSize,
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
    return this.customHttpResponse<OtherFrevoEntity>(
      await this._otherFrevoEntityService.getById(idParam.id),
    );
  }

  @Put('id/:id')
  @UseGuards(AssociationAdminGuard)
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
    return this.customHttpResponse<OtherFrevoEntity>(
      await this._otherFrevoEntityService.updateEntryById(
        idParam.id,
        otherFrevoEntityDTO,
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
  public async deleteOtherFrevoEntity(
    @Param() idParam: UUIDParam,
  ): Promise<void> {
    await this._otherFrevoEntityService.deleteEntryById(idParam.id);
  }
}

export default OtherFrevoEntityController;
