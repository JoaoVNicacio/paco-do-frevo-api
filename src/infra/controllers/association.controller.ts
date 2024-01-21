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
import { ApiTags } from '@nestjs/swagger';
import PagingParams from '../../application/requestObjects/paging.params';
import UUIDParam from '../../application/requestObjects/uuid.param';
import IAssociationService from 'src/domain/services/iassociation.service';

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
      this.throwInternalError(error, 'houve um erro ao criar association');
    }
  }

  @Get()
  public async getAllAssociations(): Promise<Array<Association>> {
    try {
      return await this._associationService.getAllAssociations();
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'houve um erro ao obter associations');
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
      this.throwInternalError(error, 'houve um erro ao obter associations');
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
      this.throwInternalError(error, 'houve um erro ao obter association');
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
      this.throwInternalError(error, 'houve um erro ao editar association');
    }
  }

  @Delete('id/:id')
  public async deleteAssociation(@Param() idParam: UUIDParam): Promise<void> {
    try {
      await this._associationService.deleteAssociation(idParam.id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover association');
    }
  }
}

export default AssociationController;
