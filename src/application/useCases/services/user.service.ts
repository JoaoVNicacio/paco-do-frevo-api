import { Inject, Injectable } from '@nestjs/common';
import User from 'src/domain/entities/userAggregate/user.entity';
import IUserRepository from 'src/domain/repositories/iuser.repository';
import IUserService from 'src/domain/services/iuser.service';
import { Mapper as IMapper } from '@automapper/core';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';

@Injectable()
class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly _userRepository: IUserRepository,

    @Inject('IMapper')
    private readonly _userMapper: IMapper,
  ) {}

  public async createUser(user: UserForCreationDTO): Promise<User> {
    return await this._userRepository.createUser(
      this._userMapper.map(user, UserForCreationDTO, User),
    );
  }
}

export default UserService;
