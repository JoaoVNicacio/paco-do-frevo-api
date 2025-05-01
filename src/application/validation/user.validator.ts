import AsyncBaseValidator from './base/base.validator';
import User from '../../domain/aggregates/userAggregate/user.entity';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import EUserRoles from '../../domain/aggregates/userAggregate/enums/euser-roles';

class UserValidator extends AsyncBaseValidator<User> {
  protected mapPropsFromOrigin(origin: User): void {
    this.firstName = origin.firstName;
    this.lastName = origin.lastName;
    this.role = origin.role;
    this.email = origin.email;
    this.password = origin.password;
  }

  @IsNotEmpty()
  private firstName: string;

  @IsNotEmpty()
  private lastName: string;

  @IsNotEmpty()
  private role: EUserRoles;

  @IsEmail({}, { message: 'Invalid email format' })
  private email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
  private password: string;
}

export default UserValidator;
