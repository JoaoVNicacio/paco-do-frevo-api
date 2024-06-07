import { Inject, Injectable } from '@nestjs/common';
import User from 'src/domain/aggregates/userAggregate/user.entity';
import IUserRepository from 'src/domain/repositories/iuser.repository';
import { Mapper as IMapper } from '@automapper/core';
import UserForCreationDTO from 'src/application/dtos/userDtos/user-for-creation.dto';
import ValidationResponse from 'src/shared/responseObjects/validation.response';
import HashingPipe from 'src/application/pipes/hashing.pipe';
import UserDTO from 'src/application/dtos/userDtos/user.dto';
import { ValidationError } from 'class-validator';
import { Mapper } from 'src/application/symbols/dependency-injection.symbols';
import { LoggerService as ILogger } from '@nestjs/common';
import { Logger } from 'src/application/symbols/dependency-injection.symbols';
import IUserService from '../contracts/services/iuser.service';

@Injectable()
class UserService implements IUserService {
  constructor(
    @Inject(IUserRepository)
    private readonly _userRepository: IUserRepository,

    @Inject(Mapper)
    private readonly _mapper: IMapper,

    @Inject(Logger)
    private readonly _logger: ILogger,

    private readonly _hashingPipe: HashingPipe,
  ) {}

  public async createUser(
    userDto: UserForCreationDTO,
  ): Promise<ValidationResponse<UserDTO>> {
    const newUser = this._mapper.map(userDto, UserForCreationDTO, User);
    newUser.password = userDto.password;

    newUser.sanitizeEntityProperties();

    const isValid = await newUser.isValid();
    const validationResult = await newUser.validateCreation();

    if (!isValid) {
      this._logger.log(
        `<⛔️> ➤ The creation of the user: ${userDto.email} didn't pass validation.`,
      );

      return new ValidationResponse(
        this._mapper.map(newUser, User, UserDTO),
        validationResult,
      );
    }

    if (await this._userRepository.findByEmail(userDto.email)) {
      this._logger.log(
        `<⛔️> ➤ Denied creation of the user: ${userDto.email}, the user already exists.`,
      );

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

    this._logger.log(`<💾> ➤ Created the User with id: ${insertResponse.id}.`);

    return new ValidationResponse(
      this._mapper.map(insertResponse, User, UserDTO),
      validationResult,
    );
  }

  public async getById(id: string): Promise<User> {
    return await this._userRepository.findById(id);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this._userRepository.findByEmail(email);
  }
}

export default UserService;
