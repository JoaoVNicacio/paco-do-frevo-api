/** The `PagedResults` class represents a paginated result set with information about the current page,
total count, and whether there is a next page. */
class PagedResults<T> {
  public result: Array<T>;
  public hasNextPage: boolean;
  public pageIndex: number;
  public pageSize: number;
  public totalCount: number;
  public totalPages: number;

  constructor(
    result: Array<T>,
    hasNextPage: boolean,
    pageIndex: number,
    pageSize: number,
    totalCount: number,
  ) {
    this.result = result;
    this.hasNextPage = hasNextPage;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / pageSize);
  }
}

export default PagedResults;
