import { ValidationResult } from "joi";

interface IEntityValidation<TEntity> {
  validate(entity: TEntity): ValidationResult;
}

export default IEntityValidation;
