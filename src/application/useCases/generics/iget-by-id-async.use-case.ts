/** The interface `IGetByIdAsyncUseCase` has
 * a method signature `getById()` that returns a `Promise` of one or none
 * the type `T` where the id matches on a data Accessor.
 * @typeparam `TEntity` represents the type of the entity
 * @typeparam `TId` represents the type of the id.
 */
interface IGetByIdAsyncUseCase<TEntity, TId> {
  getById(id: TId): Promise<TEntity | undefined>;
}

export default IGetByIdAsyncUseCase;
