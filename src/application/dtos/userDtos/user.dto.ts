import EUserRoles from 'src/domain/entities/userAggregate/enums/euser-roles';

class UserDTO {
  public firstName: string;
  public lastName: string;
  public role: EUserRoles;
  public email: string;
  public password: string;
}

export default UserDTO;
