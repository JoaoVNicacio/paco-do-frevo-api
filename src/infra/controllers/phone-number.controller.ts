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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import IPhoneNumberService from 'src/domain/services/iphone-number.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';

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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: PhoneNumber,
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: PhoneNumberDTO,
  })
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

  @Get('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: PhoneNumber,
  })
  @ApiNotFoundResponse({
    description: 'The record was not found.',
    type: String,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
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
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: PhoneNumber,
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: PhoneNumberDTO,
  })
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
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Object,
  })
  public async deletePhoneNumber(@Param() idParam: UUIDParam): Promise<void> {
    try {
      await this._phoneNumberService.deletePhoneNumber(idParam.id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover phone number');
    }
  }
}

export default PhoneNumberController;
