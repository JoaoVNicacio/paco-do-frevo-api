import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import UserForLoginDTO from 'src/application/dtos/userDtos/user-for-login.dto';
import IHashingHandler from 'src/domain/handlers/ihashing.handler';
import IAuthService from 'src/domain/services/iauth.service';
import IUserService from 'src/domain/services/iuser.service';

@Injectable()
class AuthService implements IAuthService {
  constructor(
    @Inject(IUserService)
    private readonly _userService: IUserService,

    @Inject(IHashingHandler)
    private readonly _hashingHandler: IHashingHandler,
  ) {}

  public async login(user: UserForLoginDTO): Promise<string> {
    const userFromDb = await this._userService.findByEmail(user.email);

    if (!userFromDb) {
      throw new NotFoundException(
        'Não existe um usuário com esse email em nossa base de dados.',
      );
    }

    const passwordHashMatches = this._hashingHandler.compareHashes(
      user.password,
      userFromDb.hashedPassword,
    );

    if (!passwordHashMatches) {
      throw new UnauthorizedException(
        'As informações de login fornecidas estão incorretas',
      );
    }

    return '';
  }
}

export default AuthService;
