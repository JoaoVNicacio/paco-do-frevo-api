import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ContactService from 'src/application/useCases/services/contact.service';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ControllerBase from './controller.base';
import { ApiTags } from '@nestjs/swagger';
import UUIDParam from './requestObjects/uuid.param';

@ApiTags('Contacts')
@Controller('contacts')
class ContactController extends ControllerBase {
  constructor(private readonly contactService: ContactService) {
    super();
  }

  @Post()
  public async createContact(
    @Body() contactDTO: ContactDTO,
    @Param('associationId') associationId: string,
  ): Promise<Contact> {
    try {
      const createdContact = await this.contactService.createContact(
        contactDTO,
        associationId,
      );

      return this.sendCustomValidationResponse<Contact>(createdContact);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error creating the contact');
    }
  }

  @Get('id/:id')
  public async getContactById(@Param() idParam: UUIDParam): Promise<Contact> {
    try {
      return this.sendCustomResponse(
        await this.contactService.getContactById(idParam.id),
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error creating the contact');
    }
  }

  @Put('id/:id')
  public async updateContact(
    @Param() idParam: UUIDParam,
    @Body() contactDTO: ContactDTO,
  ): Promise<Contact> {
    try {
      const updatedContact = await this.contactService.updateContact(
        idParam.id,
        contactDTO,
      );

      return this.sendCustomValidationResponse<Contact>(updatedContact);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error updating the contact');
    }
  }

  @Delete('id/:id')
  public async deleteContact(@Param('id') id: string): Promise<void> {
    try {
      await this.contactService.deleteContact(id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error deleting the contact');
    }
  }
}

export default ContactController;
