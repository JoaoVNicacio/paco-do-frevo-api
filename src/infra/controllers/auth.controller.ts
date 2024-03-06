import { Body, Controller, Inject, Post } from '@nestjs/common';
import ControllerBase from './base.controller';
import UserForLoginDTO from 'src/application/dtos/userDtos/user-for-login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import IAuthService from 'src/domain/services/iauth.service';
import { ValidationPipeResponseRepresentation } from 'src/application/valueRepresentations/values.representations';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';

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
    description: 'The JWT token has been successfully created.',
    type: String,
  })
  @ApiBadRequestResponse({
    description: 'The request has an error on the sent object.',
    type: ValidationPipeResponseRepresentation,
  })
  @ApiNotFoundResponseWithSchema()
  @ApiUnauthorizedResponseWithSchema()
  @ApiBody({
    description: 'The record data.',
    type: UserForLoginDTO,
  })
  public async login(@Body() user: UserForLoginDTO): Promise<string> {
    return this.sendCustomResponse(await this._authService.login(user));
  }
}

export default AuthController;
