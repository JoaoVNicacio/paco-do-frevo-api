import { ValidationError } from 'class-validator';

/** The ValidationResponse class represents the result of a validation process, including the output,
validation result, and whether it is valid or not. */
class ValidationResponse<TEntity> {
  public output: TEntity;
  public validationResult: Array<ValidationError> = [];
  public get isValid() {
    return this.validationResult.length === 0;
  }

  constructor(output: TEntity, validationResult: Array<ValidationError>) {
    this.output = output;
    this.validationResult = validationResult;
  }
}

export default ValidationResponse;
