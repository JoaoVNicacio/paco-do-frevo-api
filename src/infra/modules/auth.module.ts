import { ConsoleLogger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mapper from 'src/application/mappers/mapper';
import HashingPipe from 'src/application/pipes/hashing.pipe';
import { UserSchema } from 'src/domain/entities/userAggregate/user.entity';
import IHashingHandler from 'src/application/handlers/ihashing.handler';
import HashingHandler from '../handlers/hashing.handler';
import IAuthService from 'src/domain/services/iauth.service';
import AuthService from 'src/application/useCases/services/auth.service';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import AuthController from '../controllers/auth.controller';
import * as dotenv from 'dotenv';
import {
  CacheManager,
  Logger,
  Mapper,
} from 'src/application/symbols/dependency-injection.symbols';
import { CACHE_MANAGER as cacheManger } from '@nestjs/cache-manager';

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
