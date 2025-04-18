import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/shared/responseObjects/paged.results';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import ControllerBase from '../../core/controllers/base.controller';
import PagingParams from '../../shared/requestObjects/params/paging.params';
import UUIDParam from '../../shared/requestObjects/params/uuid.param';
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
import IAssociationService from 'src/application/contracts/services/iassociation.service';
import { ValidationPipeResponseRepresentation } from 'src/shared/valueRepresentations/values.representations';
import AssociationFilteringParam from 'src/shared/requestObjects/params/association.filtering-param';
import PagingParamsPipe from 'src/application/pipes/paging-results.pipe';
import SimplifiedAssociationDTO from 'src/application/dtos/associationDtos/simplified-association.dto';
import EOrderingParam from 'src/shared/requestObjects/params/enums/eordering.param';
import AssociationFilteringParamPipe from 'src/application/pipes/association.filtering-param.pipe';
import { User } from '../decorators/user-token.decorator';
import IJwtPayload from 'src/shared/requestObjects/ijwt.payload';
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
import {
  SearchParamQuery,
  AssociationTypeQuery,
  DistrictQuery,
  CityQuery,
  StateQuery,
  MinMemberAmmountQuery,
  MaxMemberAmmountQuery,
} from '../decorators/association.filtering-param.decorator';
import {
  PageIndexQuery,
  PageSizeQuery,
} from '../decorators/paging-params.decorator';

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
    @User() user: IJwtPayload,
  ): Promise<Association> {
    return this.customHttpResponse<Association>(
      await this._associationService.createEntry(associationDTO, user.sub),
    );
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(20))
  @ApiOkResponse({
    description: 'The records have been successfully fetched.',
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(SimplifiedAssociationDTO) },
    },
  })
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  @SearchParamQuery()
  @AssociationTypeQuery()
  @DistrictQuery()
  @CityQuery()
  @StateQuery()
  @MinMemberAmmountQuery()
  @MaxMemberAmmountQuery()
  @ApiQuery({ name: 'ordering', enum: EOrderingParam, required: false })
  public async getAllAssociations(
    @Query(AssociationFilteringParamPipe)
    filterParams?: AssociationFilteringParam,
    @Query('ordering')
    ordering?: EOrderingParam,
  ): Promise<Array<SimplifiedAssociationDTO>> {
    return this.customHttpResponse(
      await this._associationService.getAll(filterParams, ordering),
    );
  }

  @Get('/paged')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(20))
  @ApiPagedResultsResponse(SimplifiedAssociationDTO)
  @ApiNoContentResponse({
    description: 'The request returned no records.',
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationPipeResponseRepresentation,
  })
  @PageIndexQuery()
  @PageSizeQuery()
  @SearchParamQuery()
  @AssociationTypeQuery()
  @DistrictQuery()
  @CityQuery()
  @StateQuery()
  @MinMemberAmmountQuery()
  @MaxMemberAmmountQuery()
  @ApiQuery({ name: 'ordering', enum: EOrderingParam, required: false })
  public async getPagedAssociations(
    @Query(PagingParamsPipe)
    pagingParams: PagingParams,
    @Query(AssociationFilteringParamPipe)
    filterParams?: AssociationFilteringParam,
    @Query('ordering')
    ordering?: EOrderingParam,
  ): Promise<PagedResults<SimplifiedAssociationDTO>> {
    return this.customHttpResponse(
      await this._associationService.getPaged(
        pagingParams.page,
        pagingParams.pageSize,
        filterParams,
        ordering,
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
    return this.customHttpResponse<Association>(
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
    return this.customHttpResponse<Association>(
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
