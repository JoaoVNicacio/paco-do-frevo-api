import PagedResults from 'src/application/responseObjects/paged.results';
import EOrderingParam from 'src/shared/requestObjects/params/enums/eordering.param';

/** The interface `IGetPagedAsyncUseCase` has
 * a method signature `getPaged()` that returns a `Promise`
 *  of elements of the type `T` on a data Accessor in a paged manner.
 * @typeparam `T` represents the value type
 * @typeparam `TFilter` represents the possible filter param
 */
interface IGetPagedAsyncUseCase<T, TFilter = undefined> {
  /**
   * The `getPaged()` method in the `IGetPagedAsyncUseCase` interface is defining a method signature that
   * returns a `Promise` of an `PagedResults` of elements of type `T`
   * @returns returns a promise resolving to an `PagedResults` of elements of type `T`.
   * @typeparam `T` represents the value type
   * @typeparam `TFilter` represents the possible filter param
   */
  getPaged(
    page: number,
    pageSize: number,
    filterParams?: TFilter,
    orderingParam?: EOrderingParam,
  ): Promise<PagedResults<T>>;
}

export default IGetPagedAsyncUseCase;
