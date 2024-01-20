import { Controller } from '@nestjs/common';
import ControllerBase from './base.controller';
import UserService from 'src/application/useCases/services/user.service';
import { ApiTags } from '@nestjs/swagger';
import UserDTO from 'src/application/dtos/userDtos/user.dto';

@ApiTags('SocialNetworks')
@Controller('users')
class UserController extends ControllerBase {
  constructor(private readonly _userService: UserService) {
    super();
  }

  public async createUser(user: UserDTO) {
    return await this._userService.createUser(user);
  }
}

export default UserController;
