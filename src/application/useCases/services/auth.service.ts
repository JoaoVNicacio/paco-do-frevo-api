import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserForLoginDTO from 'src/application/dtos/userDtos/user-for-login.dto';
import IJwtPayload from 'src/application/requestObjects/ijwt.payload';
import IHashingHandler from 'src/application/handlers/ihashing.handler';
import IAuthService from 'src/domain/services/iauth.service';
import IUserService from 'src/domain/services/iuser.service';

@Injectable()
class AuthService implements IAuthService {
  constructor(
    @Inject(IUserService)
    private readonly _userService: IUserService,

    @Inject(IHashingHandler)
    private readonly _hashingHandler: IHashingHandler,

    private readonly _jwtService: JwtService,
  ) {}

  public async login(user: UserForLoginDTO): Promise<string> {
    const userFromDb = await this._userService.findByEmail(user.email);

    if (!userFromDb) {
      throw new NotFoundException(
        'Não existe um usuário com esse email em nossa base de dados.',
      );
    }

    const passwordHashMatches = this._hashingHandler.comparePlainTextToHash(
      user.password,
      userFromDb.passwordHash,
    );

    if (!passwordHashMatches) {
      throw new UnauthorizedException(
        'As informações de login fornecidas estão incorretas',
      );
    }

    const payload = {
      sub: userFromDb.id,
      userName: `${userFromDb.firstName} ${userFromDb.lastName}`,
      userRole: userFromDb.role,
    } satisfies IJwtPayload;

    return await this._jwtService.signAsync(payload);
  }
}

export default AuthService;
