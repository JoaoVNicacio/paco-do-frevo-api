/** The interface `IGetAllAsyncUseCase` has
 * a method signature `getAll()` that returns a `Promise` of all
 *  of elements of the type `T` on a data Accessor.
 * @typeparam `T` represents the value type
 */
interface IGetAllAsyncUseCase<T> {
  /**
   * The `getAll()` method in the `IGetAllAsyncUseCase` interface is defining a method signature that
   * returns a `Promise` of an array of elements of type `T`
   * @returns returns a promise resolving to an array of elements of type `T`, or `undefined` if there are no
   * elements to return.
   * @typeparam `T` represents the value type
   */
  getAll(): Promise<Array<T> | undefined>;
}

export default IGetAllAsyncUseCase;
