import { ConsoleLogger, Module, Scope } from '@nestjs/common';
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
      scope: Scope.REQUEST,
    },

    // Services:
    {
      provide: IUserService,
      useClass: UserService,
      scope: Scope.REQUEST,
    },

    // Handlers:
    {
      provide: IHashingHandler,
      useClass: HashingHandler,
      scope: Scope.REQUEST,
    },

    // Mappers:
    {
      provide: Mapper,
      useValue: mapper,
      scope: Scope.DEFAULT,
    },

    // CacheManager:
    {
      provide: CacheManager,
      useExisting: cacheManager,
      scope: Scope.DEFAULT,
    },

    // Pipes:
    {
      provide: HashingPipe,
      useClass: HashingPipe,
      scope: Scope.TRANSIENT,
    },

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
      scope: Scope.DEFAULT,
    },
  ],
  exports: [
    // Repositories:
    {
      provide: IUserRepository,
      useClass: UserRepository,
      scope: Scope.REQUEST,
    },

    // Services:
    {
      provide: IUserService,
      useClass: UserService,
      scope: Scope.REQUEST,
    },
  ],
})
export class UserModule {}
