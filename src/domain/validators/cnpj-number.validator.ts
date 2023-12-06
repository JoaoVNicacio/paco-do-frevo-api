import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import DocumentNumberValidatorTemplate from './document-number.validator';
import Association from '../entities/associationAggregate/association.entity';

/** The `CnpjNumberValidator` class is class that validates a given number against specific
rules for a CNPJ (Brazilian company identification number). */
class CnpjNumberValidator extends DocumentNumberValidatorTemplate {
  private readonly _cnpjLength: number = 14;
  private readonly _firstChecksumStartIndex: number = 12;
  private readonly _firstChecksumFactor: number = 5;
  private readonly _secondChecksumStartIndex: number = 13;
  private readonly _secondChecksumFactor: number = 6;
  private readonly _checksumModulus: number = 11;

  /**
   * The method validates a given number against specific rules for a CNPJ (Brazilian company
   * identification number).
   * @param {string} number - The `number` parameter is a string representing a CNPJ number.
   * @returns The method is returning a boolean value.
   */
  protected override validateSpecificRules(number: string): boolean {
    if (!/^\d{14}$/.test(number)) {
      return false;
    }

    const digits = new Array<number>(this._cnpjLength);

    for (let i = 0; i < this._cnpjLength; i++) {
      digits[i] = parseInt(number[i]);
    }

    if (
      !this.ValidateCNPJChecksum(
        digits,
        this._firstChecksumStartIndex,
        this._firstChecksumFactor,
      ) ||
      !this.ValidateCNPJChecksum(
        digits,
        this._secondChecksumStartIndex,
        this._secondChecksumFactor,
      )
    ) {
      return false;
    }

    return true;
  }

  /** `ValidateCNPJChecksum` method is a private helper method used in the `CnpjNumberValidator` class
to validate the checksum of a CNPJ number. */
  private ValidateCNPJChecksum(
    digits: number[],
    startIndex: number,
    factor: number,
  ): boolean {
    let sum = 0;

    for (let i = 0; i < startIndex; i++) {
      sum += digits[i] * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }

    const remainder = sum % this._checksumModulus;

    if (remainder < 2) {
      return digits[startIndex] === 0;
    }

    return digits[startIndex] === this._checksumModulus - remainder;
  }
}

/**
 * The ValidCnpjNumber function is a decorator that can be used to validate if a given value is a valid
 * CNPJ number.
 * @param {ValidationOptions} [validationOptions] - The `validationOptions` parameter is an optional
 * object that allows you to customize the validation behavior. It can include properties such as
 * `message` (a custom error message to be displayed when validation fails), `groups` (an array of
 * validation groups to which this decorator belongs), and other options specific to
 * @returns The function `ValidCnpjNumber` is returning a decorator function.
 */
export function ValidCnpjNumber(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'validCnpjNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const entity = args.object as Association;
          const isLegalEntity = entity.isLegalEntity;

          if (isLegalEntity === false && value !== null) {
            return false;
          }

          if (isLegalEntity === true) {
            if (!value || typeof value !== 'string') {
              return false;
            }

            return new CnpjNumberValidator().validate(entity.getCnpj);
          }

          return true;
        },
      },
    });
  };
}

export default CnpjNumberValidator;
