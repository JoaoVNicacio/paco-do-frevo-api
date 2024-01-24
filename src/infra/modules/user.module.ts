import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/domain/entities/userAggregate/user.entity';
import UserRepository from '../repositories/user.repository';
import UserService from 'src/application/useCases/services/user.service';
import UserController from '../controllers/user.controller';
import IUserRepository from 'src/domain/repositories/iuser.repository';
import IUserService from 'src/domain/services/iuser.service';
import mapper from 'src/application/mappers/mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    // Repositories:
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },

    // Services:
    {
      provide: IUserService,
      useClass: UserService,
    },

    // Mappers:
    {
      provide: 'IMapper',
      useValue: mapper,
    },
  ],
})
export class UserModule {}
