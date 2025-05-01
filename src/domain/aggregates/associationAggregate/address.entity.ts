import Association from './association.entity';
import IAddress from '../../entityInterfaces/iaddress.entity-base';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';
import { ValidationDelegate } from '../../../shared/validation/validators/validation.types';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';

class AssociationAddress extends UserStampedEntity<string> implements IAddress {
  @AutoMap()
  @ApiProperty()
  public addressSite: string;

  @AutoMap()
  @ApiProperty()
  public number: string;

  @AutoMap()
  @ApiProperty()
  public complement: string;

  @AutoMap()
  @ApiProperty()
  public district: string;

  @AutoMap()
  @ApiProperty()
  public city: string;

  @AutoMap()
  @ApiProperty()
  public state: string;

  @AutoMap()
  @ApiProperty()
  public country: string;

  @AutoMap()
  @ApiProperty()
  public zipCode: string;

  public association: Association;

  public validationDelegate: ValidationDelegate<IAddress> | null | undefined =
    null;

  public sanitizeEntityProperties(): void {
    this.addressSite = this.addressSite
      ? CleanStringBuilder.fromString(this.addressSite)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.addressSite;

    this.number = this.number
      ? CleanStringBuilder.fromString(this.number)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.number;

    this.district = this.district
      ? CleanStringBuilder.fromString(this.district)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.district;

    this.city = this.city
      ? CleanStringBuilder.fromString(this.city)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.city;

    this.state = this.state.toLocaleUpperCase();

    this.country = this.country ? this.country.toLocaleUpperCase() : 'BR';

    this.complement = this.complement
      ? CleanStringBuilder.fromString(this.complement)
          .withoutUnnecessarySpaces()
          .toInitCap(true)
          .build()
      : this.complement;
  }

  public async isValid(): Promise<boolean> {
    return (
      (await this.validateEntity()).length === 0 &&
      this.validationDelegate !== null &&
      this.validationDelegate !== undefined
    );
  }

  public async validateEntity(): Promise<Array<ValidationErrorSignature>> {
    if (this.validationDelegate) return this.validationDelegate(this);

    return [];
  }
}

export default AssociationAddress;
