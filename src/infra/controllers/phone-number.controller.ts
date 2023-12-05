import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import PhoneNumberService from 'src/application/useCases/services/phone-number.service';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PhoneNumbers')
@Controller('phoneNumbers')
class PhoneNumberController extends ControllerBase {
  constructor(private readonly _phoneNumberService: PhoneNumberService) {
    super();
  }

  @Post('contact/:contactId')
  public async createPhoneNumber(
    @Body() phoneNumberDTO: PhoneNumberDTO,
    @Param('contactId') contactId: string,
  ): Promise<PhoneNumber> {
    try {
      const createdPhoneNumber =
        await this._phoneNumberService.createPhoneNumber(
          phoneNumberDTO,
          contactId,
        );

      return this.sendCustomValidationResponse<PhoneNumber>(createdPhoneNumber);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error creating the phone number',
      );
    }
  }

  @Get()
  public async getAllPhoneNumbers(): Promise<PhoneNumber[]> {
    try {
      const phoneNumbers = await this._phoneNumberService.getAllPhoneNumbers();

      return phoneNumbers;
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error getting the phone numbers',
      );
    }
  }

  @Get('id/:id')
  public async getAssociationById(
    @Param('id') id: string,
  ): Promise<PhoneNumber> {
    try {
      return await this._phoneNumberService.getPhoneNumberById(id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error retriving the phone number',
      );
    }
  }

  @Put('id/:id')
  public async updtadeAssociation(
    @Param('id') id: string,
    @Body() phoneNumberDTO: PhoneNumberDTO,
  ): Promise<PhoneNumber> {
    try {
      const updatePhoneNumber =
        await this._phoneNumberService.updatePhoneNumber(id, phoneNumberDTO);

      return this.sendCustomValidationResponse<PhoneNumber>(updatePhoneNumber);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error updating the phone number',
      );
    }
  }

  @Delete('id/:id')
  public async deletePhoneNumber(@Param('id') id: string): Promise<void> {
    try {
      await this._phoneNumberService.deletePhoneNumber(id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(
        error,
        'There was an error deleting the phone number',
      );
    }
  }
}

export default PhoneNumberController;
