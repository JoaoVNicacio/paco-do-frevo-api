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
import Contact from 'src/domain/aggregates/associationAggregate/contact.entity';
import ControllerBase from '../../core/controllers/base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import UUIDParam from '../../shared/requestObjects/params/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import TimeParser from 'src/shared/utils/time.parser';
import IContactService from 'src/application/contracts/services/icontact.service';
import { ValidationPipeResponseRepresentation } from 'src/shared/valueRepresentations/values.representations';

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
    return this.customHttpResponse<Contact>(
      await this.contactService.createEntry(contactDTO, idParam.id),
    );
  }

  @Get('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(30))
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: Contact,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getContactById(@Param() idParam: UUIDParam): Promise<Contact> {
    return this.customHttpResponse(
      await this.contactService.getById(idParam.id),
    );
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
    return this.customHttpResponse<Contact>(
      await this.contactService.updateEntryById(idParam.id, contactDTO),
    );
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
    await this.contactService.deleteEntryById(id);
  }
}

export default ContactController;
