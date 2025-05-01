import AsyncBaseValidator from './base/base.validator';
import Member from '../../domain/aggregates/associationAggregate/member.entity';
import { IsBoolean, IsIn, IsInt, IsNotEmpty } from 'class-validator';
import MemberConstants from '../../domain/aggregates/associationAggregate/constants/member.constants';

class MemberValidation extends AsyncBaseValidator<Member> {
  protected mapPropsFromOrigin(origin: Member): void {
    this.surname = origin.surname;
    this.role = origin.role;
    this.actuationTimeInMonths = origin.actuationTimeInMonths;
    this.isFrevoTheMainRevenueIncome = origin.isFrevoTheMainRevenueIncome;
  }

  @IsNotEmpty({ message: 'Name is required' })
  private name: string;

  @IsNotEmpty({ message: 'Surname is required' })
  private surname: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(MemberConstants.memberTypes)
  private role: string;

  @IsInt({ message: 'Actuation time must be an integer' })
  private actuationTimeInMonths: number;

  @IsBoolean({ message: 'isFrevoTheMainRevenueIncome must be a boolean' })
  private isFrevoTheMainRevenueIncome: boolean;
}

export default MemberValidation;
