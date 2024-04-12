import { ValidationError } from 'class-validator';
import IEntity from './ientity.base';

/**
 * The `IUserStampedEntity` interface extends the `IEntity` interface with additional properties
 * `createdBy` and `updatedBy`. This means that any class that implements `IUserStampedEntity` must
 * also implement the properties `createdBy` and `updatedBy`, in addition to the properties defined in
 * `IEntity`. This allows for defining entities that have user stamping capabilities, where `createdBy`
 * represents the user who created the entity and `updatedBy` represents the user who last updated the
 * entity.
 */
export interface IUserStampedEntity<TId> extends IEntity<TId> {
  createdBy: string;
  updatedBy: string;
}

/**
 * The `UserStampedEntity` abstract class implements the `IUserStampedEntity` interface with additional properties
 * This allows for defining entities that have user stamping capabilities, where `createdBy`
 * represents the user who created the entity and `updatedBy` represents the user who last updated the
 * entity.
 * @methods `setCreationStamps` and `setUpdateStamps`, are setting the `createdBy` and
 * `updatedBy` properties of an entity with the provided `userId` value.
 */
export abstract class UserStampedEntity<TId>
  implements IUserStampedEntity<TId>
{
  public abstract id: TId;
  public abstract createdBy: string;
  public abstract updatedBy: string;
  public abstract createdAt: Date;
  public abstract updatedAt: Date;

  public abstract isValid(): boolean | Promise<boolean>;

  public abstract validateCreation():
    | ValidationError[]
    | Promise<ValidationError[]>;

  public setCreationStamps(userId: string): void {
    this.createdBy = userId;
  }

  public setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }
}
