import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import EUserRoles from 'src/domain/entities/userAggregate/enums/euser-roles';

class UserDTO {
  @AutoMap()
  @ApiProperty()
  public firstName: string;

  @AutoMap()
  @ApiProperty()
  public lastName: string;

  @AutoMap()
  @ApiProperty()
  public role: EUserRoles;

  @AutoMap()
  @ApiProperty()
  public email: string;
}

export default UserDTO;
