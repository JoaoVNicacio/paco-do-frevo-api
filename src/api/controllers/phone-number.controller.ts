import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import PhoneNumberDTO from 'src/application/dtos/associationDtos/phone-number.dto';
import PhoneNumber from 'src/domain/aggregates/associationAggregate/phone-number.entity';
import ControllerBase from './base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import IPhoneNumberService from 'src/application/contracts/services/iphone-number.service';
import { ValidationPipeResponseRepresentation } from 'src/shared/valueRepresentations/values.representations';

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
    type: PhoneNumberDTO,
  })
  public async createPhoneNumber(
    @Body() phoneNumberDTO: PhoneNumberDTO,
    @Param() idParm: UUIDParam,
  ): Promise<PhoneNumber> {
    return this.sendCustomValidationResponse<PhoneNumber>(
      await this._phoneNumberService.createEntry(phoneNumberDTO, idParm.id),
    );
  }

  @Get('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: PhoneNumber,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getAssociationById(
    @Param() idParam: UUIDParam,
  ): Promise<PhoneNumber> {
    return await this._phoneNumberService.getById(idParam.id);
  }

  @Put('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(20000)
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: PhoneNumber,
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
    type: PhoneNumberDTO,
  })
  public async updtadeAssociation(
    @Param() idParam: UUIDParam,
    @Body() phoneNumberDTO: PhoneNumberDTO,
  ): Promise<PhoneNumber> {
    return this.sendCustomValidationResponse<PhoneNumber>(
      await this._phoneNumberService.updateEntryById(
        idParam.id,
        phoneNumberDTO,
      ),
    );
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Object,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiNotFoundResponseWithSchema()
  public async deletePhoneNumber(@Param() idParam: UUIDParam): Promise<void> {
    await this._phoneNumberService.deleteEntryById(idParam.id);
  }
}

export default PhoneNumberController;
