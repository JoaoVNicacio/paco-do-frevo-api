import UserDTO from 'src/application/dtos/userDtos/user.dto';
import User from '../entities/userAggregate/user.entity';

interface IUserService {
  createUser(user: UserDTO): Promise<User>;
}

const IUserService = Symbol('IUserService');

export default IUserService;
