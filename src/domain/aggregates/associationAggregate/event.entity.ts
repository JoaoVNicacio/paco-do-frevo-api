import {
  IsNotEmpty,
  IsInt,
  Min,
  ValidationError,
  validate,
} from 'class-validator';
import Association from './association.entity';
import { Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

class Event extends UserStampedEntity<string> {
  @IsNotEmpty({ message: 'Event type is required' })
  @AutoMap()
  @ApiProperty()
  public eventType: string;

  @Type(() => Date)
  @AutoMap()
  @ApiProperty()
  public dateOfAccomplishment: Date;

  @IsInt({ message: 'Participants amount must be an integer' })
  @Min(0)
  @AutoMap()
  @ApiProperty()
  public participantsAmount: number;

  public association: Association;

  @ApiProperty()
  public associationId: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty()
  public createdBy: string;

  @ApiProperty()
  public updatedBy: string;

  public sanitizeEntityProperties(): void {
    this.eventType = this.eventType
      ? CleanStringBuilder.fromString(this.eventType)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.eventType;
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default Event;
