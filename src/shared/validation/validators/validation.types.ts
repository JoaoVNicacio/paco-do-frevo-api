import ValidationErrorSignature from '../responses/validation-error.signature';

export type ValidationDelegate<T> = (
  e: T,
) => Promise<Array<ValidationErrorSignature>> | Array<ValidationErrorSignature>;
