import { Body, Controller, Inject, Post } from '@nestjs/common';
import ControllerBase from '../../core/controllers/base.controller';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';
import UserDTO from 'src/application/dtos/userDtos/user.dto';
import ValidationErrorDTO from 'src/application/dtos/validationErrorsDTOs/validation-error.dto';
import IUserService from 'src/application/contracts/services/iuser.service';

@ApiTags('Users')
@Controller('users')
class UserController extends ControllerBase {
  constructor(
    @Inject(IUserService)
    private readonly _userService: IUserService,
  ) {
    super();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserDTO,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationErrorDTO,
  })
  @ApiBody({
    description: 'The record data.',
    type: UserForCreationDTO,
  })
  public async createUser(@Body() user: UserForCreationDTO): Promise<UserDTO> {
    return this.customHttpResponse(await this._userService.createEntry(user));
  }
}

export default UserController;
