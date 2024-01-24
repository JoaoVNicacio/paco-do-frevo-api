import { Controller, Inject } from '@nestjs/common';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import IUserService from 'src/domain/services/iuser.service';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';

@ApiTags('Users')
@Controller('users')
class UserController extends ControllerBase {
  constructor(
    @Inject(IUserService)
    private readonly _userService: IUserService,
  ) {
    super();
  }

  public async createUser(user: UserForCreationDTO) {
    return await this._userService.createUser(user);
  }
}

export default UserController;
