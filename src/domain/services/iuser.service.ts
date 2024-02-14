import ValidationResponse from 'src/application/responseObjects/validation.response';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';
import UserDTO from 'src/application/dtos/userDtos/user.dto';
import User from '../entities/userAggregate/user.entity';

interface IUserService {
  createUser(userDto: UserForCreationDTO): Promise<ValidationResponse<UserDTO>>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

const IUserService = Symbol('IUserService');

export default IUserService;
