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
import { ApiTags } from '@nestjs/swagger';
import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/other-frevo-entity.dto';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import IOtherFrevoEntityService from 'src/domain/services/iother-frevo-entity.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import PagingParams from 'src/application/requestObjects/paging.params';

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
  public async createOtherFrevoEntity(
    @Body() otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<OtherFrevoEntity> {
    try {
      // eslint-disable-next-line prettier/prettier
      const createdOtherFrevoEntity = await this._otherFrevoEntityService.createOtherFrevoEntity(otherFrevoEntityDTO);

      return this.sendCustomValidationResponse<OtherFrevoEntity>(
        createdOtherFrevoEntity,
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar otherFrevoEntity');
    }
  }

  @Get()
  public async getAllOtherFrevoEntities(): Promise<Array<OtherFrevoEntity>> {
    try {
      return await this._otherFrevoEntityService.getAllOtherFrevoEntities();
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'houve um erro ao obter otherFrevoEntities',
      );
    }
  }

  @Get('/paged')
  public async getPagedOtherFrevoEntities(
    @Query() pagingParams: PagingParams,
  ): Promise<PagedResults<OtherFrevoEntity>> {
    try {
      return await this._otherFrevoEntityService.getPagedOtherFrevoEntities(
        pagingParams.page,
        pagingParams.pageSize,
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'houve um erro ao obter otherFrevoEntities',
      );
    }
  }

  @Get('id/:id')
  public async getOtherFrevoEntityById(
    @Param('id') idParam: UUIDParam,
  ): Promise<OtherFrevoEntity> {
    try {
      return this.sendCustomResponse<OtherFrevoEntity>(
        await this._otherFrevoEntityService.getOtherFrevoEntityById(idParam.id),
      );
      // eslint-disable-next-line prettier/prettier
  }
  catch(error){
      this.throwInternalError(error, 'houve um erro ao obter otherFrevoEntity');
    }
  }

  @Put('id/:id')
  public async updateOtherFrevoEntity(
    @Param('id') idParam: UUIDParam,
    @Body() otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<OtherFrevoEntity> {
    try {
      // eslint-disable-next-line prettier/prettier
      const updatedOtherFrevoEntity = await this._otherFrevoEntityService.updateOtherFrevoEntity(idParam.id ,otherFrevoEntityDTO);

      return this.sendCustomValidationResponse<OtherFrevoEntity>(
        updatedOtherFrevoEntity,
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar otherFrevoEntity');
    }
  }

  @Delete('id/:id')
  public async deleteOtherFrevoEntity(
    @Param('id') idParam: UUIDParam,
  ): Promise<void> {
    try {
      await this._otherFrevoEntityService.deleteOtherFrevoEntity(idParam.id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'houve um erro ao remover otherFrevoEntity',
      );
    }
  }
}

export default OtherFrevoEntityController;
