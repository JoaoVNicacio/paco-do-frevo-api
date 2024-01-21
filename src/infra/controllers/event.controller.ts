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
import Event from 'src/domain/entities/associationAggregate/event.entity';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import IEventService from 'src/domain/services/ievent.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';

@ApiTags('Events')
@Controller('event')
class EventController extends ControllerBase {
  constructor(
    @Inject(IEventService)
    private readonly _eventService: IEventService,
  ) {
    super();
  }

  @Post('association/:id')
  public async createEvent(
    @Body() eventDTO: EventDTO,
    @Param('id') associationId: UUIDParam,
  ): Promise<Event> {
    try {
      const event = await this._eventService.createEvent(
        eventDTO,
        associationId.id,
      );

      return this.sendCustomValidationResponse<Event>(event);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar event');
    }
  }

  @Get('id/:id')
  public async getAssociationById(
    @Param('id') idParam: UUIDParam,
  ): Promise<Event> {
    try {
      return this.sendCustomResponse(
        await this._eventService.findById(idParam.id),
      );
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'There was an error retriving the event');
    }
  }

  @Put('id/:id')
  public async updtadeAssociation(
    @Param('id') idParam: UUIDParam,
    @Body() eventDTO: EventDTO,
  ): Promise<Event> {
    try {
      const event = await this._eventService.updateEvent(idParam.id, eventDTO);

      return this.sendCustomValidationResponse<Event>(event);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'houve um erro ao atualizar contact');
    }
  }

  @Delete('id/:id')
  public async deleteEvent(@Param('id') id: string): Promise<void> {
    try {
      await this._eventService.deleteEvent(id);
      // eslint-disable-next-line prettier/prettier
    }
    catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover event');
    }
  }
}

export default EventController;
