import PagingParamsPipe from 'src/application/pipes/paging-results.pipe';
import PagingParams from 'src/shared/requestObjects/params/paging.params';

describe('PagingParamsPipe', () => {
  let pipe: PagingParamsPipe;

  beforeEach(() => {
    pipe = new PagingParamsPipe();
  });

  it('should transform valid PagingParams', () => {
    // Arrange
    const pagingParams = new PagingParams();
    pagingParams.page = 2;
    pagingParams.pageSize = 20;

    // Act
    const transformedParams = pipe.transform(pagingParams);

    // Assert
    expect(transformedParams).toEqual(pagingParams);
  });

  it('should transform undefined to default PagingParams', () => {
    // Act
    const transformedParams = pipe.transform(undefined);

    // Assert
    expect(transformedParams.page).toBe(1);
    expect(transformedParams.pageSize).toBe(10);
  });

  it('should transform null to default PagingParams', () => {
    // Act
    const transformedParams = pipe.transform(null);

    // Assert
    expect(transformedParams.page).toBe(1);
    expect(transformedParams.pageSize).toBe(10);
  });

  it('should transform invalid page to default page', () => {
    // Arrange
    const invalidParams = { page: 'abc', pageSize: 20 };

    // Act
    const transformedParams = pipe.transform(invalidParams);

    // Assert
    expect(transformedParams.page).toBe(1);
    expect(transformedParams.pageSize).toBe(20);
  });

  it('should transform invalid pageSize to default pageSize', () => {
    // Arrange
    const invalidParams = { page: 2, pageSize: 'xyz' };

    // Act
    const transformedParams = pipe.transform(invalidParams);

    // Assert
    expect(transformedParams.page).toBe(2);
    expect(transformedParams.pageSize).toBe(10);
  });

  it('should transform invalid PagingParams to default PagingParams', () => {
    // Arrange
    const invalidParams = { page: 'abc', pageSize: 'xyz' };

    // Act
    const transformedParams = pipe.transform(invalidParams);

    // Assert
    expect(transformedParams.page).toBe(1);
    expect(transformedParams.pageSize).toBe(10);
  });
});
