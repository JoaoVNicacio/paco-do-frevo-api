import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import CnpjNumberValidator from '../../../domain/validators/cnpj-number.validator';

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
        validate(value: any | undefined | null, args: ValidationArguments) {
          const isLegalEntity =
            'isLegalEntity' in args.object ? args.object.isLegalEntity : false;

          value = 'cnpj' in args.object ? args.object.cnpj : null;

          if (!isLegalEntity && (value === null || value == undefined)) {
            return false;
          }

          if (isLegalEntity) {
            if (!value || typeof value !== 'string') {
              return false;
            }

            return new CnpjNumberValidator().validate(value);
          }

          return true;
        },
      },
    });
  };
}