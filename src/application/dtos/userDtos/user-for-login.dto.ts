import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

class UserForLoginDTO {
  @AutoMap()
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  public email: string;

  @AutoMap()
  @ApiProperty()
  public password: string;
}

export default UserForLoginDTO;
