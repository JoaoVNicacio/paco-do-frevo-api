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
import Event from 'src/domain/entities/associationAggregate/event.entity';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import ControllerBase from './base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import IEventService from 'src/domain/services/ievent.service';
import UUIDParam from 'src/application/requestObjects/uuid.param';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { CacheInterceptor } from '@nestjs/cache-manager/dist/interceptors/cache.interceptor';
import { CacheTTL } from '@nestjs/cache-manager';
import TimeParser from 'src/application/utils/time.parser';

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
    description: 'The request has an error on the sent object.',
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
      return this.sendCustomValidationResponse<Event>(
        await this._eventService.createEvent(eventDTO, associationId.id),
      );
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao criar event');
    }
  }

  @Get('id/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromSecondsToMilliseconds(30))
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: Event,
  })
  @ApiNotFoundResponseWithSchema()
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
    description: 'The request has an error on the sent object.',
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
      return this.sendCustomValidationResponse<Event>(
        await this._eventService.updateEvent(idParam.id, eventDTO),
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
  public async deleteEvent(@Param() id: string): Promise<void> {
    try {
      await this._eventService.deleteEvent(id);
    } catch (error) {
      this.throwInternalError(error, 'houve um erro ao remover event');
    }
  }
}

export default EventController;
