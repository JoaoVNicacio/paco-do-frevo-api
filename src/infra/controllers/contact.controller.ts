import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import UUIDParam from '../../application/requestObjects/uuid.param';
import IContactService from 'src/domain/services/icontact.service';

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
  public async createContact(
    @Body() contactDTO: ContactDTO,
    @Param() idParam: UUIDParam,
  ): Promise<Contact> {
    try {
      const createdContact = await this.contactService.createContact(
        contactDTO,
        idParam.id,
      );

      return this.sendCustomValidationResponse<Contact>(createdContact);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar contact');
    }
  }

  @Get('id/:id')
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
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao atualizar contact');
    }
  }

  @Delete('id/:id')
  public async deleteContact(@Param() id: string): Promise<void> {
    try {
      await this.contactService.deleteContact(id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover contact');
    }
  }
}

export default ContactController;
