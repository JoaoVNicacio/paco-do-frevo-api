import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import PagedResults from 'src/application/responseObjects/paged.results';
import ControllerBase from './controller.base';
import { ApiTags } from '@nestjs/swagger';
import OtherFrevoEntityService from 'src/application/useCases/services/otherFrevoEntity.service';
import OtherFrevoEntityDTO from 'src/application/dtos/otherFrevoMakersDtos/otherFrevoEntity.dto';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/otherFrevoEntity.entity';

@ApiTags('OtherFrevoEntity')
@Controller('otherFrevoEntities')
class OtherFrevoEntityController extends ControllerBase {
  constructor(
    private readonly _otherFrevoEntityService: OtherFrevoEntityService,
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
      this.throwInternalError(
        error,
        'There was an error creating the otherFrevoEntity',
      );
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
        'There was an error retrieving the otherFrevoEntities',
      );
    }
  }

  @Get('/paged')
  public async getPagedOtherFrevoEntities(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<PagedResults<OtherFrevoEntity>> {
    try {
      return await this._otherFrevoEntityService.getPagedOtherFrevoEntities(
        page,
        pageSize,
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error retrieving the otherFrevoEntities',
      );
    }
  }

  @Get('id/:id')
  public async getOtherFrevoEntityById(
    @Param('id') id: string,
  ): Promise<OtherFrevoEntity> {
    try {
      return this.sendCustomResponse<OtherFrevoEntity>(
        await this._otherFrevoEntityService.getOtherFrevoEntityById(id),
      );
      // eslint-disable-next-line prettier/prettier
  }
  catch(error){
      this.throwInternalError(
        error,
        'There was an error retrieving the otherFrevoEntity',
      );
    }
  }

  @Put('id/:id')
  public async updateOtherFrevoEntity(
    @Param('id') id: string,
    @Body() otherFrevoEntityDTO: OtherFrevoEntityDTO,
  ): Promise<OtherFrevoEntity> {
    try {
      // eslint-disable-next-line prettier/prettier
      const updatedOtherFrevoEntity = await this._otherFrevoEntityService.updateOtherFrevoEntity(id,otherFrevoEntityDTO);

      return this.sendCustomValidationResponse<OtherFrevoEntity>(
        updatedOtherFrevoEntity,
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error creating the otherFrevoEntity',
      );
    }
  }

  @Delete('id/:id')
  public async deleteOtherFrevoEntity(@Param('id') id: string): Promise<void> {
    try {
      await this._otherFrevoEntityService.deleteOtherFrevoEntity(id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error deleting the otherFrevoEntity',
      );
    }
  }
}

export default OtherFrevoEntityController;
