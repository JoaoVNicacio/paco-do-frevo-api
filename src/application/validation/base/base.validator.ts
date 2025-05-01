import IBaseValidator from '../../../shared/validation/validators/ibase.validator';
import ValidationErrorSignature from '../../../shared/validation/responses/validation-error.signature';
import { validate } from 'class-validator';

abstract class AsyncBaseValidator<T> implements IBaseValidator<T> {
  constructor(origin?: T) {
    if (origin) this.mapPropsFromOrigin(origin);
  }

  public async validate(e: T): Promise<Array<ValidationErrorSignature>> {
    this.mapPropsFromOrigin(e);
    return (await validate(this)) as Array<ValidationErrorSignature>;
  }

  protected abstract mapPropsFromOrigin(origin: T): void;
}

export default AsyncBaseValidator;
