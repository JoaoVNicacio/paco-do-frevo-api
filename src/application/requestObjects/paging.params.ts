import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

class PagingParams {
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  public page: number = 1;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  public pageSize: number = 10;
}

export default PagingParams;
