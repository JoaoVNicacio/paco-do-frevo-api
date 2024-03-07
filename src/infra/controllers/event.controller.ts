import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
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
import AuthGuard from '../guards/auth.guard';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';
import TimeParser from 'src/application/utils/time.parser';
import AssociationAdminGuard from '../guards/association-admin.guard';

@ApiTags('Events')
@Controller('events')
@UseGuards(AuthGuard)
@ApiUnauthorizedResponseWithSchema()
class EventController extends ControllerBase {
  constructor(
    @Inject(IEventService)
    private readonly _eventService: IEventService,
  ) {
    super();
  }

  @Post('association/:id')
  @UseGuards(AssociationAdminGuard)
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
    return this.sendCustomValidationResponse<Event>(
      await this._eventService.createEvent(eventDTO, associationId.id),
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
    return this.sendCustomResponse(
      await this._eventService.findById(idParam.id),
    );
  }

  @Put('id/:id')
  @UseGuards(AssociationAdminGuard)
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
    return this.sendCustomValidationResponse<Event>(
      await this._eventService.updateEvent(idParam.id, eventDTO),
    );
  }

  @Delete('id/:id')
  @UseGuards(AssociationAdminGuard)
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
    await this._eventService.deleteEvent(id);
  }
}

export default EventController;
