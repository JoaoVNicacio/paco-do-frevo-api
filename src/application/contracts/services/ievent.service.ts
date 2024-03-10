import EventDTO from 'src/application/dtos/associationDtos/event.dto';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import ICreateEntryForRootAsyncUseCase from 'src/application/useCases/generics/icreate-for-root.use-case';
import IDeleteEntryAsyncUseCase from 'src/application/useCases/generics/idelete-entry.use-case';
import IUpdateEntryAsyncUseCase from 'src/application/useCases/generics/iupdate-entry.use-case';

interface IEventService
  extends IGetByIdAsyncUseCase<Event, string>,
    ICreateEntryForRootAsyncUseCase<Event, EventDTO, string>,
    IUpdateEntryAsyncUseCase<Event, EventDTO, string>,
    IDeleteEntryAsyncUseCase<string> {
  createEntry(
    eventDto: EventDTO,
    associationId: string,
  ): Promise<ValidationResponse<Event>>;
  getById(id: string): Promise<Event | undefined>;
  updateEntryById(
    id: string,
    eventDto: EventDTO,
  ): Promise<ValidationResponse<Event>>;
  deleteEntryById(id: string): Promise<void>;
}

const IEventService = Symbol('IEventService');

export default IEventService;
