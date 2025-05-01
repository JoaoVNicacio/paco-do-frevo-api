import ValidationErrorSignature from '../responses/validation-error.signature';

interface IBaseValidator<T> {
  validate(
    e: T,
  ): Promise<Array<ValidationErrorSignature>> | Array<ValidationErrorSignature>;
}

export default IBaseValidator;
