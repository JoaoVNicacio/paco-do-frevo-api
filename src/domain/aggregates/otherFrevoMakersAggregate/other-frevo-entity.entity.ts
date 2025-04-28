import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ValidationError,
  validate,
} from 'class-validator';
import OtherFrevoEntityAddress from './other-frevo-entity-address.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

/** This class represents a Frevo entity that isn't an Association with its various properties, relationships and behaviour. */
class OtherFrevoEntity extends UserStampedEntity<string> {
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  @ApiProperty()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  @ApiProperty()
  public type: string;

  @IsNotEmpty()
  @IsString()
  @AutoMap()
  @ApiProperty()
  public entityHistoryNotes: string;

  @IsInt()
  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;

  @ValidateNested()
  @AutoMap()
  @ApiProperty()
  public address: OtherFrevoEntityAddress | null | undefined;

  public sanitizeEntityProperties(): void {
    this.name = this.name
      ? CleanStringBuilder.fromString(this.name)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.name;

    this.type = this.type
      ? CleanStringBuilder.fromString(this.type)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.type;

    this.entityHistoryNotes = this.entityHistoryNotes
      ? CleanStringBuilder.fromString(this.entityHistoryNotes)
          .withoutUnnecessarySpaces()
          .capitalizeFirstLetter()
          .build()
      : this.entityHistoryNotes;

    this.address?.sanitizeEntityProperties();
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default OtherFrevoEntity;
