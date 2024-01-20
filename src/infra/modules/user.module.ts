import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/domain/entities/userAggregate/user.entity';
import UserRepository from '../repositories/user.repository';
import UserService from 'src/application/useCases/services/user.service';
import UserController from '../controllers/user.controller';
import UserMapper from 'src/application/mappers/user.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserRepository, UserService, UserMapper],
  controllers: [UserController],
})
export class UserModule {}
