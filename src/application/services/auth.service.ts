import {
  Inject,
  Injectable,
  LoggerService as ILogger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserForLoginDTO from 'src/application/dtos/userDtos/user-for-login.dto';
import IJwtPayload from 'src/application/requestObjects/ijwt.payload';
import IHashingHandler from 'src/application/contracts/handlers/ihashing.handler';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import IAuthService from '../contracts/services/iauth.service';
import IUserService from '../contracts/services/iuser.service';

@Injectable()
class AuthService implements IAuthService {
  constructor(
    @Inject(IUserService)
    private readonly _userService: IUserService,

    @Inject(IHashingHandler)
    private readonly _hashingHandler: IHashingHandler,

    @Inject(Logger)
    private readonly _logger: ILogger,

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
      this._logger.warn(
        `<🔐❌> ➤ Login attempt with the login: ${user.email} with a wrong password.`,
      );

      throw new UnauthorizedException(
        'As informações de login fornecidas estão incorretas',
      );
    }

    const payload = {
      sub: userFromDb.id,
      userName: `${userFromDb.firstName} ${userFromDb.lastName}`,
      userRole: userFromDb.role,
    } satisfies IJwtPayload;

    const token = await this._jwtService.signAsync(payload);
    this._logger.log(`<🔐✔️> ➤ Authenticated user: ${userFromDb.email}.`);

    return token;
  }
}

export default AuthService;
