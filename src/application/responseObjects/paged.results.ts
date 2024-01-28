import { ApiProperty } from '@nestjs/swagger';

/** The `PagedResults` class represents a paginated result set with information about the current page,
total count, and whether there is a next page. */
class PagedResults<T> {
  @ApiProperty()
  public result: Array<T>;

  @ApiProperty()
  public hasNextPage: boolean;

  @ApiProperty()
  public pageIndex: number;

  @ApiProperty()
  public pageSize: number;

  @ApiProperty()
  public totalCount: number;

  @ApiProperty()
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
