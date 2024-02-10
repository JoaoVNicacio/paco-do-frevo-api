import ValidationResponse from 'src/application/responseObjects/validation.response';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';
import UserDTO from 'src/application/dtos/userDtos/user.dto';

interface IUserService {
  createUser(userDto: UserForCreationDTO): Promise<ValidationResponse<UserDTO>>;
}

const IUserService = Symbol('IUserService');

export default IUserService;
