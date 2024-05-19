import {
  Body,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import ControllerBase from '../../core/controllers/base.controller';
import UserForLoginDTO from 'src/application/dtos/userDtos/user-for-login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiNotFoundResponseWithSchema } from '../swaggerSchemas/not-found.schema';
import { ApiUnauthorizedResponseWithSchema } from '../swaggerSchemas/unauthorized.schema';
import IAuthService from 'src/application/contracts/services/iauth.service';
import { ValidationPipeResponseRepresentation } from 'src/shared/valueRepresentations/values.representations';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import TimeParser from 'src/shared/utils/time.parser';

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
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TimeParser.fromMinutesToMilliseconds(8))
  @ApiOkResponse({
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
    return this.customHttpResponse(await this._authService.login(user));
  }
}

export default AuthController;
