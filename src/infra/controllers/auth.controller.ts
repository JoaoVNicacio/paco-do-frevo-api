import { Body, Controller, Inject, Post } from '@nestjs/common';
import ControllerBase from './base.controller';
import HashingPipe from 'src/application/pipes/hashing.pipe';
import UserForLoginDTO from 'src/application/dtos/userDtos/user-for-login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import IAuthService from 'src/domain/services/iauth.service';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';

@Controller('authorization')
@ApiTags('Authorization')
class AuthController extends ControllerBase {
  constructor(
    @Inject(IAuthService)
    private readonly _authService: IAuthService,
  ) {
    super();
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: String,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiBody({
    description: 'The record data.',
    type: UserForLoginDTO,
  })
  public async login(
    @Body() user: UserForLoginDTO,
    @Body('password', HashingPipe) password: string,
  ): Promise<string> {
    try {
      return this.sendCustomResponse(
        await this._authService.login({ password: password, ...user }),
      );
    } catch (error) {
      this.throwInternalError(error, 'Houve um erro ao entrar com o usuário');
    }
  }
}

export default AuthController;
