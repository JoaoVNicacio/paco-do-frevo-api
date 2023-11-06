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
} from '@nestjs/common';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import ContactService from 'src/application/useCases/services/contact.service';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';

@Controller('contacts')
class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  public async createContact(@Body() contactDTO: ContactDTO): Promise<Contact> {
    try {
      const createdContact =
        await this.contactService.createContact(contactDTO);
      return createdContact;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar contato',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  public async getAllContacts(): Promise<Contact[]> {
    try {
      const contacts = await this.contactService.getAllContacts();
      return contacts;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar contatos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  public async getContactById(@Param('id') id: string): Promise<Contact> {
    const contact = await this.contactService.getContactById(id);
    if (!contact) {
      throw new HttpException('Contato não encontrado', HttpStatus.NOT_FOUND);
    }
    return contact;
  }

  @Put(':id')
  public async updateContact(
    @Param('id') id: string,
    @Body() contactDTO: ContactDTO,
  ): Promise<Contact> {
    try {
      const updatedContact = await this.contactService.updateContact(
        id,
        contactDTO,
      );
      return updatedContact;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar contato.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public async deleteContact(@Param('id') id: string): Promise<void> {
    try {
      await this.contactService.deleteContact(id);
    } catch (error) {
      throw new HttpException(
        'Erro ao excluir contato',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default ContactController;
