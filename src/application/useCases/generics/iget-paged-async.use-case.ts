import PagedResults from 'src/application/responseObjects/paged.results';

/** The interface `IGetPagedAsyncUseCase` has
 * a method signature `getPaged()` that returns a `Promise`
 *  of elements of the type `T` on a data Accessor in a paged manner.
 * @typeparam `T` represents the value type
 */
interface IGetPagedAsyncUseCase<T> {
  /**
   * The `getPaged()` method in the `IGetPagedAsyncUseCase` interface is defining a method signature that
   * returns a `Promise` of an `PagedResults` of elements of type `T`
   * @returns returns a promise resolving to an `PagedResults` of elements of type `T`.
   * @typeparam `T` represents the value type
   */
  getPaged(page: number, pageSize: number): Promise<PagedResults<T>>;
}

export default IGetPagedAsyncUseCase;
