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
import Event from 'src/domain/entities/associationAggregate/event.entity';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import EventService from 'src/application/useCases/services/event.service';

@Controller()
class EventController {
  constructor(private readonly _eventService: EventService) {}

  @Post()
  public async createEvent(@Body() eventDTO: EventDTO): Promise<Event> {
    try {
      return await this._eventService.createEvent(eventDTO);
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao criar número de telefone',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  public async getAssociationById(@Param('id') id: string): Promise<Event> {
    const phoneNumber = await this._eventService.findById(id);

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
    @Body() eventDTO: EventDTO,
  ): Promise<Event> {
    try {
      return await this._eventService.updateEvent(id, eventDTO);
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao atualizar número de telefone.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  public async deleteEvent(@Param('id') id: string): Promise<void> {
    try {
      await this._eventService.deleteEvent(id);
      // eslint-disable-next-line prettier/prettier
    } 
    catch (error) {
      throw new HttpException(
        'Erro ao excluir evento.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default EventController;
