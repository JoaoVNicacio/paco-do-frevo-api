import User from 'src/domain/entities/userAggregate/user.entity';
import UserDTO from '../dtos/userDtos/user.dto';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class UserMapper implements IMapper<User, UserDTO> {
  entityToDTO(entity: User): UserDTO {
    if (!entity) {
      return null;
    }

    return {
      firstName: entity.firstName,
      lastName: entity.lastName,
      role: entity.role,
      email: entity.email,
      password: entity.password,
    } as UserDTO;
  }

  dtoToEntity(dto: UserDTO): User {
    if (!dto) {
      return null;
    }

    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
      email: dto.email,
      password: dto.password,
    } as User;
  }
}

export default UserMapper;
