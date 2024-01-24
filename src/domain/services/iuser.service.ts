import User from '../entities/userAggregate/user.entity';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';

interface IUserService {
  createUser(user: UserForCreationDTO): Promise<User>;
}

const IUserService = Symbol('IUserService');

export default IUserService;
