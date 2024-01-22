import { AutoMap } from '@automapper/classes';

class MemberDTO {
  @AutoMap()
  public name: string;
  @AutoMap()
  public surname: string;
  @AutoMap()
  public role: string;
  @AutoMap()
  public actuationTimeInMonths: number;
  @AutoMap()
  public isFrevoTheMainRevenueIncome: boolean;
}

export default MemberDTO;
