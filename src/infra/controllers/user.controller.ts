import { Controller, Inject } from '@nestjs/common';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import UserDTO from 'src/application/dtos/userDtos/user.dto';
import IUserService from 'src/domain/services/iuser.service';

@ApiTags('Users')
@Controller('users')
class UserController extends ControllerBase {
  constructor(
    @Inject(IUserService)
    private readonly _userService: IUserService,
  ) {
    super();
  }

  public async createUser(user: UserDTO) {
    return await this._userService.createUser(user);
  }
}

export default UserController;
