import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import IPhoneNumberService from 'src/domain/services/iphone-number.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';

@ApiTags('PhoneNumbers')
@Controller('phoneNumbers')
class PhoneNumberController extends ControllerBase {
  constructor(
    @Inject(IPhoneNumberService)
    private readonly _phoneNumberService: IPhoneNumberService,
  ) {
    super();
  }

  @Post('contact/:id')
  public async createPhoneNumber(
    @Body() phoneNumberDTO: PhoneNumberDTO,
    @Param() idParm: UUIDParam,
  ): Promise<PhoneNumber> {
    try {
      const createdPhoneNumber =
        await this._phoneNumberService.createPhoneNumber(
          phoneNumberDTO,
          idParm.id,
        );

      return this.sendCustomValidationResponse<PhoneNumber>(createdPhoneNumber);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar phone number');
    }
  }

  @Get()
  public async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    try {
      const phoneNumbers = await this._phoneNumberService.getAllPhoneNumbers();

      return phoneNumbers;
    } catch (error) {
      this.throwInternalError(
        error,
        'There was an error getting the phone numbers',
      );
    }
  }

  @Get('id/:id')
  public async getAssociationById(
    @Param() idParam: UUIDParam,
  ): Promise<PhoneNumber> {
    try {
      return await this._phoneNumberService.getPhoneNumberById(idParam.id);
    } catch (error) {
      this.throwInternalError(
        error,
        'There was an error retriving the phone number',
      );
    }
  }

  @Put('id/:id')
  public async updtadeAssociation(
    @Param() idParam: UUIDParam,
    @Body() phoneNumberDTO: PhoneNumberDTO,
  ): Promise<PhoneNumber> {
    try {
      const updatePhoneNumber =
        await this._phoneNumberService.updatePhoneNumber(
          idParam.id,
          phoneNumberDTO,
        );

      return this.sendCustomValidationResponse<PhoneNumber>(updatePhoneNumber);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao atualizar phone number');
    }
  }

  @Delete('id/:id')
  public async deletePhoneNumber(
    @Param() idParam: UUIDParam,
  ): Promise<void> {
    try {
      await this._phoneNumberService.deletePhoneNumber(idParam.id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover phone number');
    }
  }
}

export default PhoneNumberController;
