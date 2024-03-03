import { Inject, Injectable } from '@nestjs/common';
import User from 'src/domain/entities/userAggregate/user.entity';
import IUserRepository from 'src/domain/repositories/iuser.repository';
import IUserService from 'src/domain/services/iuser.service';
import { Mapper as IMapper } from '@automapper/core';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';
import ValidationResponse from 'src/application/responseObjects/validation.response';
import HashingPipe from 'src/application/pipes/hashing.pipe';
import UserDTO from 'src/application/dtos/userDtos/user.dto';
import { ValidationError } from 'class-validator';
import { Mapper } from 'src/application/symbols/dependency-injection.symbols';

@Injectable()
class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly _userRepository: IUserRepository,

    @Inject(Mapper)
    private readonly _mapper: IMapper,

    private readonly _hashingPipe: HashingPipe,
  ) {}

  public async createUser(
    userDto: UserForCreationDTO,
  ): Promise<ValidationResponse<UserDTO>> {
    const newUser = this._mapper.map(userDto, UserForCreationDTO, User);
    newUser.password = userDto.password;

    const isValid = await newUser.isValid();
    const validationResult = await newUser.validateCreation();

    if (!isValid) {
      return new ValidationResponse(
        this._mapper.map(newUser, User, UserDTO),
        validationResult,
      );
    }

    if (await this._userRepository.findByEmail(userDto.email)) {
      const error = new ValidationError();
      error.constraints = { alreadyUsed: 'The given email is already used.' };
      error.property = 'email';
      error.children = [];

      validationResult.push(error);

      return new ValidationResponse(
        this._mapper.map(newUser, User, UserDTO),
        validationResult,
      );
    }

    newUser.hashedPassword = this._hashingPipe.transform(userDto.password);

    const insertResponse = await this._userRepository.createUser(newUser);

    return new ValidationResponse(
      this._mapper.map(insertResponse, User, UserDTO),
      validationResult,
    );
  }

  public async findById(id: string): Promise<User> {
    return await this._userRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this._userRepository.findByEmail(email);
  }
}

export default UserService;
