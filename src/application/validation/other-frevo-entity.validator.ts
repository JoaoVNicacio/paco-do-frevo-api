import AsyncBaseValidator from './base/base.validator';
import OtherFrevoEntity from '../../domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity.entity';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import AddressValidator from './address.validator';

class OtherFrevoEntityValidator extends AsyncBaseValidator<OtherFrevoEntity> {
  protected mapPropsFromOrigin(origin: OtherFrevoEntity): void {
    this.name = origin.name;
    this.type = origin.type;
    this.entityHistoryNotes = origin.entityHistoryNotes;
    this.actuationTimeInMonths = origin.actuationTimeInMonths;

    this.address = origin.address ? new AddressValidator(origin.address) : null;
  }

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public type: string;

  @IsNotEmpty()
  @IsString()
  public entityHistoryNotes: string;

  @IsInt()
  public actuationTimeInMonths: number;

  @ValidateNested()
  public address: AddressValidator | null | undefined;
}

export default OtherFrevoEntityValidator;
