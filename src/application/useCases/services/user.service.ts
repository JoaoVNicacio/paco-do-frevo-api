import { Inject, Injectable } from '@nestjs/common';
import UserDTO from 'src/application/dtos/userDtos/user.dto';
import UserMapper from 'src/application/mappers/user.mapper';
import User from 'src/domain/entities/userAggregate/user.entity';
import IUserRepository from 'src/domain/repositories/iuser.repository';
import IUserService from 'src/domain/services/iuser.service';

@Injectable()
class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly _userRepository: IUserRepository,
    private readonly _userMapper: UserMapper,
  ) {}

  public async createUser(user: UserDTO): Promise<User> {
    return await this._userRepository.createUser(
      this._userMapper.dtoToEntity(user),
    );
  }
}

export default UserService;
