import { ConsoleLogger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserRepository from '../repositories/user.repository';
import UserService from 'src/application/services/user.service';
import IUserRepository from 'src/domain/repositories/iuser.repository';
import IHashingHandler from 'src/application/contracts/handlers/ihashing.handler';
import HashingHandler from '../handlers/hashing.handler';
import HashingPipe from 'src/application/pipes/hashing.pipe';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManager } from '@nestjs/cache-manager';
import IUserService from 'src/application/contracts/services/iuser.service';
import mapper from 'src/application/mapping/mapper';
import UserController from 'src/api/controllers/user.controller';
import { UserSchema } from '../schemas/userAggregate/user.schema';

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

    // Handlers:
    {
      provide: IHashingHandler,
      useClass: HashingHandler,
    },

    // Mappers:
    {
      provide: Mapper,
      useValue: mapper,
    },

    // CacheManager:
    {
      provide: CacheManager,
      useExisting: cacheManager,
    },

    // Pipes:
    HashingPipe,

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
    },
  ],
  exports: [
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
  ],
})
export class UserModule {}
