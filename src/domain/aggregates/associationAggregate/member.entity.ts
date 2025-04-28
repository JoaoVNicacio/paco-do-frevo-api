import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  validate,
  ValidationError,
  IsIn,
} from 'class-validator';
import Association from './association.entity';
import MemberConstants from './constants/member.constants';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

class Member extends UserStampedEntity<string> {
  @IsNotEmpty({ message: 'Name is required' })
  @AutoMap()
  @ApiProperty()
  public name: string;

  @IsNotEmpty({ message: 'Surname is required' })
  @AutoMap()
  @ApiProperty()
  public surname: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(MemberConstants.memberTypes)
  @AutoMap()
  @ApiProperty()
  public role: string;

  @IsInt({ message: 'Actuation time must be an integer' })
  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;

  @IsBoolean({ message: 'isFrevoTheMainRevenueIncome must be a boolean' })
  @AutoMap()
  @ApiProperty()
  public isFrevoTheMainRevenueIncome: boolean;

  public association: Association;

  @ApiProperty()
  public associationId: string;

  public sanitizeEntityProperties(): void {
    this.name = this.name
      ? CleanStringBuilder.fromString(this.name)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.name;

    this.surname = this.surname
      ? CleanStringBuilder.fromString(this.surname)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.surname;
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default Member;
