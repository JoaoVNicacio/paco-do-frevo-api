import { Body, Controller, Inject } from '@nestjs/common';
import ControllerBase from './base.controller';
import { ApiTags } from '@nestjs/swagger';
import IUserService from 'src/domain/services/iuser.service';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';
import UserDTO from 'src/application/dtos/userDtos/user.dto';

@ApiTags('Users')
@Controller('users')
class UserController extends ControllerBase {
  constructor(
    @Inject(IUserService)
    private readonly _userService: IUserService,
  ) {
    super();
  }

  public async createUser(@Body() user: UserForCreationDTO): Promise<UserDTO> {
    try {
      return this.sendCustomValidationResponse(
        await this._userService.createUser(user),
      );
    } catch (error) {
      this.throwInternalError(error, 'Houve um erro criando o usuário');
    }
  }
}

export default UserController;
