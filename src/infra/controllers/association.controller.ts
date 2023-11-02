import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import AssociationDTO from 'src/application/dtos/associationDtos/association.dto';
import PagedResults from 'src/application/responseObjects/paged.results';
import AssociationService from 'src/application/useCases/services/association.service';
import Association from 'src/domain/entities/associationAggregate/association.entity';

@Controller('associations')
class AssociationController {
  constructor(private readonly associationService: AssociationService) {}

  @Post()
  public async createAssociation(
    @Body() associationDTO: AssociationDTO,
  ): Promise<Association> {
    try {
      // eslint-disable-next-line prettier/prettier
      const createdAssociation = await this.associationService.createAssociation(associationDTO);

      return createdAssociation;
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao criar associação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public async getAllAssociations(): Promise<Association[]> {
    try {
      const associations = await this.associationService.getAllAssociations();

      return associations;
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao buscar associações',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('paged')
  public async getPagedAssociations(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ): Promise<PagedResults<Association>> {
    try {
      const result = await this.associationService.getPagedAssociations(
        page,
        pageSize,
      );

      return result;
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao buscar associações',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  public async getAssociationById(
    @Param('id') id: string,
  ): Promise<Association> {
    const association = await this.associationService.getAssociationById(id);

    if (!association) {
      throw new HttpException(
        'Associação não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    return association;
  }

  @Put(':id')
  public async updateAssociation(
    @Param('id') id: string,
    @Body() associationDTO: AssociationDTO,
  ): Promise<Association> {
    try {
      // eslint-disable-next-line prettier/prettier
      const updatedAssociation = await this.associationService.updateAssociation(id, associationDTO);

      return updatedAssociation;
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao atualizar associação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public async deleteAssociation(@Param('id') id: string): Promise<void> {
    try {
      await this.associationService.deleteAssociation(id);
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao excluir associação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default AssociationController;
