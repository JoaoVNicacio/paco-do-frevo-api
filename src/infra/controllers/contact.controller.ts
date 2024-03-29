import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ControllerBase from './base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import UUIDParam from '../../application/requestObjects/uuid.param';
import IContactService from 'src/domain/services/icontact.service';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Contacts')
@Controller('contacts')
class ContactController extends ControllerBase {
  constructor(
    @Inject(IContactService)
    private readonly contactService: IContactService,
  ) {
    super();
  }

  @Post('association/:id')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Contact,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: ContactDTO,
  })
  public async createContact(
    @Body() contactDTO: ContactDTO,
    @Param() idParam: UUIDParam,
  ): Promise<Contact> {
    try {
      return this.sendCustomValidationResponse<Contact>(
        await this.contactService.createContact(contactDTO, idParam.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar contact');
    }
  }

  @Get('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(20000)
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: Contact,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getContactById(@Param() idParam: UUIDParam): Promise<Contact> {
    try {
      return this.sendCustomResponse(
        await this.contactService.getContactById(idParam.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar contact');
    }
  }

  @Put('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: Contact,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: ContactDTO,
  })
  public async updateContact(
    @Param() idParam: UUIDParam,
    @Body() contactDTO: ContactDTO,
  ): Promise<Contact> {
    try {
      return this.sendCustomValidationResponse<Contact>(
        await this.contactService.updateContact(idParam.id, contactDTO),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao atualizar contact');
    }
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: null,
  })
  @ApiBadRequestResponse({
    description: 'The request has an invalid id format.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async deleteContact(@Param() id: string): Promise<void> {
    try {
      await this.contactService.deleteContact(id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover contact');
    }
  }
}

export default ContactController;
