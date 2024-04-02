import { ConsoleLogger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import HashingPipe from 'src/application/pipes/hashing.pipe';
import { UserSchema } from 'src/domain/entities/userAggregate/user.entity';
import IHashingHandler from 'src/application/contracts/handlers/ihashing.handler';
import HashingHandler from '../handlers/hashing.handler';
import AuthService from 'src/application/services/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManger } from '@nestjs/cache-manager';
import IAuthService from 'src/application/contracts/services/iauth.service';
import mapper from 'src/application/mapping/mapper';
import AuthController from 'src/api/controllers/auth.controller';

dotenv.config();

@Module({
  imports: [
    UserModule,

    // Mongo DB config:
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),

    // Jwt config:
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Services:
    {
      provide: IAuthService,
      useClass: AuthService,
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
      useValue: cacheManger,
    },

    // Pipes:
    HashingPipe,

    // Loggers:
    {
      provide: Logger,
      useClass: ConsoleLogger,
    },
  ],
})
export class AuthModule {}
