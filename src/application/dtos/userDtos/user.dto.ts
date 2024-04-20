import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import EUserRoles from 'src/domain/aggregates/userAggregate/enums/euser-roles';

class UserDTO {
  @AutoMap()
  @ApiProperty()
  public firstName: string;

  @AutoMap()
  @ApiProperty()
  public lastName: string;

  @AutoMap()
  @ApiProperty({
    enum: ['Application Admin', 'Association Admin', 'Data Visualizer'],
  })
  public role: EUserRoles;

  @AutoMap()
  @ApiProperty()
  public email: string;
}

export default UserDTO;
