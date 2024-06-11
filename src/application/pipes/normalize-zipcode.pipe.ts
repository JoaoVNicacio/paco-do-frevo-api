import { Injectable, PipeTransform } from '@nestjs/common';
import IAddress from 'src/domain/entityInterfaces/iaddress.entity-base';
import AddressDTO from '../dtos/addressDTOs/address.dto';
import { getStringWithSubstringAtIndex } from 'src/shared/utils/get-string-with-substring-at-index.util';

/**
 * The `NormalizeZipCodePipe` class is a pipe that adds a hyphen to the
 * zip code at the 6th position if it is missing.
 */
@Injectable()
class NormalizeZipCodePipe implements PipeTransform {
  /**
   * The method transforms a given object by adding a hyphen to the zip code if it is missing.
   * @param {IAddress | AddressDTO} value - The `transform` method takes a parameter named `value`,
   * which can be of type `IAddress` or `AddressDTO`. The method modifies the `zipCode` property of the
   * `value` object by adding a hyphen at the 6th position if it is not already present. Finally
   * @returns The `transform` method is returning the zip code with the possible edit.
   */
  public transform(value: IAddress | AddressDTO): string {
    return value.zipCode.length > 5 && value.zipCode[5] !== '-'
      ? getStringWithSubstringAtIndex(value.zipCode, '-', 5)
      : value.zipCode;
  }
}

export default NormalizeZipCodePipe;
