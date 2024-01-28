import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

class MemberDTO {
  @AutoMap()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @ApiProperty()
  public surname: string;

  @AutoMap()
  @ApiProperty()
  public role: string;

  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;

  @AutoMap()
  @ApiProperty()
  public isFrevoTheMainRevenueIncome: boolean;
}

export default MemberDTO;
