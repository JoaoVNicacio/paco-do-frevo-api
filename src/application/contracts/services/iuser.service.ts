import ValidationResponse from 'src/shared/responseObjects/validation.response';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';
import UserDTO from 'src/application/dtos/userDtos/user.dto';
import User from 'src/domain/aggregates/userAggregate/user.entity';
import IGetByIdAsyncUseCase from 'src/application/useCases/generics/iget-by-id-async.use-case';
import ICreateEntryAsyncUseCase from 'src/application/useCases/generics/icreate-entry.use-case';

interface IUserService
  extends IGetByIdAsyncUseCase<User, string>,
    ICreateEntryAsyncUseCase<UserDTO, UserForCreationDTO> {
  createEntry(
    userDto: UserForCreationDTO,
  ): Promise<ValidationResponse<UserDTO>>;
  getById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

const IUserService = Symbol('IUserService');

export default IUserService;
