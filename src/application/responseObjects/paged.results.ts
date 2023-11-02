class PagedResults<T> {
  public result: Array<T>;
  public hasNextPage: boolean;
  public pageIndex: number;
  public pageSize: number;

  constructor(
    result: Array<T>,
    hasNextPage: boolean,
    pageIndex: number,
    pageSize: number,
  ) {
    this.result = result;
    this.hasNextPage = hasNextPage;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}

export default PagedResults;
