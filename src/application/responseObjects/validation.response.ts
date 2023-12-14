import { ValidationError } from 'class-validator';

/** The ValidationResponse class represents the result of a validation process, including the output,
validation result, and whether it is valid or not. */
class ValidationResponse<TEntity> {
  public output: TEntity;
  public validationResult: Array<ValidationError>;
  public isValid: boolean;

  constructor(
    output: TEntity,
    validationResult: Array<ValidationError>,
    isValid: boolean,
  ) {
    this.output = output;
    this.validationResult = validationResult;
    this.isValid = isValid;
  }
}

export default ValidationResponse;
