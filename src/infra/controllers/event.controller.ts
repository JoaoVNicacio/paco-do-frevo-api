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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import IEventService from 'src/domain/services/ievent.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';

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
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Event,
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: EventDTO,
  })
  public async createEvent(
    @Body() eventDTO: EventDTO,
    @Param() associationId: UUIDParam,
  ): Promise<Event> {
    try {
      const event = await this._eventService.createEvent(
        eventDTO,
        associationId.id,
      );

      return this.sendCustomValidationResponse<Event>(event);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar event');
    }
  }

  @Get('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: Event,
  })
  @ApiNotFoundResponse({
    description: 'The record was not found.',
    type: String,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  public async getAssociationById(@Param() idParam: UUIDParam): Promise<Event> {
    try {
      return this.sendCustomResponse(
        await this._eventService.findById(idParam.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'There was an error retriving the event');
    }
  }

  @Put('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: Event,
  })
  @ApiBadRequestResponse({
    description: 'The record has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiParam({ name: 'id', description: 'The record id.' })
  @ApiBody({
    description: 'The record data.',
    type: EventDTO,
  })
  public async updtadeAssociation(
    @Param() idParam: UUIDParam,
    @Body() eventDTO: EventDTO,
  ): Promise<Event> {
    try {
      const event = await this._eventService.updateEvent(idParam.id, eventDTO);

      return this.sendCustomValidationResponse<Event>(event);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao atualizar contact');
    }
  }

  @Delete('id/:id')
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
    type: Object,
  })
  public async deleteEvent(@Param() id: string): Promise<void> {
    try {
      await this._eventService.deleteEvent(id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover event');
    }
  }
}

export default EventController;
