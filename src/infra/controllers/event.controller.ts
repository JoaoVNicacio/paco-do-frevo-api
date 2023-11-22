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
import ControllerBase from './controller.base';

@Controller()
class EventController extends ControllerBase {
  constructor(private readonly _eventService: EventService) {
    super();
  }

  @Post()
  public async createEvent(
    @Body() eventDTO: EventDTO,
    @Param('associationId') associationId: string,
  ): Promise<Event> {
    try {
      const event = await this._eventService.createEvent(
        eventDTO,
        associationId,
      );

      return this.sendCustomValidationResponse<Event>(event);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error creating the event');
    }
  }

  @Get('id/:id')
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

  @Put('id/:id')
  public async updtadeAssociation(
    @Param('id') id: string,
    @Body() eventDTO: EventDTO,
  ): Promise<Event> {
    try {
      const event = await this._eventService.updateEvent(id, eventDTO);

      return this.sendCustomValidationResponse<Event>(event);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error updating the contact');
    }
  }

  @Delete('id/:id')
  public async deleteEvent(@Param('id') id: string): Promise<void> {
    try {
      await this._eventService.deleteEvent(id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error deleting the event');
    }
  }
}

export default EventController;
