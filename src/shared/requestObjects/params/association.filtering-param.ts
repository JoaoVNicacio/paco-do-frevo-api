import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Min } from 'class-validator';
import EAssociationType from 'src/domain/aggregates/associationAggregate/enums/eassociation-type.enum';

class AssociationFilteringParam {
  @ApiPropertyOptional()
  public searchParam?: string | null | undefined;

  @ApiPropertyOptional()
  public associationType?: EAssociationType;

  @ApiPropertyOptional()
  public district?: string | null | undefined;

  @ApiPropertyOptional()
  public city?: string | null | undefined;

  @ApiPropertyOptional()
  public state?: string | null | undefined;

  @ApiPropertyOptional()
  @Min(1)
  @IsOptional()
  public minMemberAmmount?: number | null | undefined;

  @ApiPropertyOptional()
  @Min(1)
  @IsOptional()
  public maxMemberAmmount?: number | null | undefined;
}

export default AssociationFilteringParam;
