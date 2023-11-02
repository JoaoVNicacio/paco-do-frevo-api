import { ValidationResult } from 'joi';

class ValidationResponse<TEntity> {
  public output: TEntity;
  public validationResult: ValidationResult;
}

export default ValidationResponse;
