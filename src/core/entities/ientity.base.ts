import { ValidationError } from 'class-validator';

/**
 * The interface `IEntity` is
 * used for defining database entities with default fields and behavior.
 * @typeparam `TId` represents the Id type.
 */
interface IEntity<TId> {
  id: TId;
  createdAt: Date;
  updatedAt: Date;
  isValid(): Promise<boolean> | boolean;
  validateCreation(): Promise<Array<ValidationError>> | Array<ValidationError>;
}

export default IEntity;
