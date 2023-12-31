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
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import AssociationService from 'src/application/useCases/services/association.service';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import PagingParams from './requestObjects/paging.params';
import UUIDParam from './requestObjects/uuid.param';

@ApiTags('Association')
@Controller('associations')
class AssociationController extends ControllerBase {
  constructor(private readonly _associationService: AssociationService) {
    super();
  }

  @Post()
  public async createAssociation(
    @Body() associationDTO: AssociationDTO,
  ): Promise<Association> {
    try {
      // eslint-disable-next-line prettier/prettier
      const createdAssociation = await this._associationService.createAssociation(associationDTO);

      return this.sendCustomValidationResponse<Association>(createdAssociation);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error creating the association',
      );
    }
  }

  @Get()
  public async getAllAssociations(): Promise<Array<Association>> {
    try {
      return await this._associationService.getAllAssociations();
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error retrieving the associations',
      );
    }
  }

  @Get('/paged')
  public async getPagedAssociations(
    @Query() pagingParams: PagingParams,
  ): Promise<PagedResults<Association>> {
    try {
      return await this._associationService.getPagedAssociations(
        Number(pagingParams.page),
        Number(pagingParams.pageSize),
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error retrieving the associations',
      );
    }
  }

  @Get('id/:id')
  public async getAssociationById(
    @Param() idParam: UUIDParam,
  ): Promise<Association> {
    try {
      return this.sendCustomResponse<Association>(
        await this._associationService.getAssociationById(idParam.id),
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error retrieving the association',
      );
    }
  }

  @Put('id/:id')
  public async updateAssociation(
    @Param() idParam: UUIDParam,
    @Body() associationDTO: AssociationDTO,
  ): Promise<Association> {
    try {
      // eslint-disable-next-line prettier/prettier
      const updatedAssociation = await this._associationService.updateAssociation(idParam.id, associationDTO);

      return this.sendCustomValidationResponse<Association>(updatedAssociation);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error creating the association',
      );
    }
  }

  @Delete('id/:id')
  public async deleteAssociation(@Param() idParam: UUIDParam): Promise<void> {
    try {
      await this._associationService.deleteAssociation(idParam.id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error deleting the association',
      );
    }
  }
}

export default AssociationController;
