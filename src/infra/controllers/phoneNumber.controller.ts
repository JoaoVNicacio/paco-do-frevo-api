import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phoneNumber.dto';
import PhoneNumberService from 'src/application/useCases/services/phoneNumber.service';
import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';

@Controller('phoneNumbers')
class PhoneNumberController {
  constructor(private readonly phoneNumberService: PhoneNumberService) {}

  @Post()
  public async createPhoneNumber(
    @Body() phoneNumberDTO: PhoneNumberDTO,
  ): Promise<PhoneNumber> {
    try {
      const createdPhoneNumber =
        await this.phoneNumberService.createPhoneNumber(phoneNumberDTO);

      return createdPhoneNumber;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar número de telefone',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    try {
      const phoneNumbers = await this.phoneNumberService.getAllPhoneNumbers();

      return phoneNumbers;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar números de telefone',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  public async getAssociationById(
    @Param('id') id: string,
  ): Promise<PhoneNumber> {
    const phoneNumber = await this.phoneNumberService.getPhoneNumberById(id);

    if (!phoneNumber) {
      throw new HttpException(
        'Número de telefone não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return phoneNumber;
  }

  @Put(':id')
  public async updtadeAssociation(
    @Param('id') id: string,
    @Body() phoneNumberDTO: PhoneNumberDTO,
  ): Promise<PhoneNumber> {
    try {
      const updatePhoneNumber = await this.phoneNumberService.updatePhoneNumber(
        id,
        phoneNumberDTO,
      );

      return updatePhoneNumber;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar número de telefone.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public async deletePhoneNumber(@Param('id') id: string): Promise<void> {
    try {
      await this.phoneNumberService.deletePhoneNumber(id);
    } catch (error) {
      throw new HttpException(
        'Erro ao excluir número de telefone.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default PhoneNumberController;
