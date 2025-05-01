import AsyncBaseValidator from './base/base.validator';
import Event from '../../domain/aggregates/associationAggregate/event.entity';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

class EventValidator extends AsyncBaseValidator<Event> {
  protected mapPropsFromOrigin(origin: Event): void {
    this.eventType = origin.eventType;
    this.dateOfAccomplishment = origin.dateOfAccomplishment;
    this.participantsAmount = origin.participantsAmount;
    this.createdBy = origin.createdBy;
    this.updatedBy = origin.updatedBy;
  }

  @IsNotEmpty({ message: 'Event type is required' })
  private eventType: string;

  @Type(() => Date)
  private dateOfAccomplishment: Date;

  @IsInt({ message: 'Participants amount must be an integer' })
  @Min(0)
  private participantsAmount: number;

  @IsOptional()
  private createdBy: string;

  @IsOptional()
  private updatedBy: string;
}

export default EventValidator;
