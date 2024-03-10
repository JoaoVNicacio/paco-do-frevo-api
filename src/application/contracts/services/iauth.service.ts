import UserForLoginDTO from 'src/application/dtos/userDtos/user-for-login.dto';

interface IAuthService {
  login(user: UserForLoginDTO): Promise<string>;
}

const IAuthService = Symbol('IAuthService');

export default IAuthService;
