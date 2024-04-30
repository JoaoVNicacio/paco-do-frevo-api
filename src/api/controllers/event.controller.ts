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
import Event from 'src/domain/aggregates/associationAggregate/event.entity';
import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import ControllerBase from '../../core/controllers/base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { CacheInterceptor } from '@nestjs/cache-manager/dist/interceptors/cache.interceptor';
import { CacheTTL } from '@nestjs/cache-manager';
import TimeParser from 'src/shared/utils/time.parser';
import IEventService from 'src/application/contracts/services/ievent.service';
import { ValidationPipeResponseRepresentation } from 'src/shared/valueRepresentations/values.representations';
import UUIDParam from 'src/shared/requestObjects/params/uuid.param';

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
    return this.customHttpValidationResponse<Event>(
      await this._eventService.createEntry(eventDTO, associationId.id),
    );
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
    return this.customHttpResponse(
      await this._eventService.getById(idParam.id),
    );
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
    return this.customHttpValidationResponse<Event>(
      await this._eventService.updateEntryById(idParam.id, eventDTO),
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
  public async deleteEvent(@Param() id: string): Promise<void> {
    await this._eventService.deleteEntryById(id);
  }
}

export default EventController;
