import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mapper from 'src/application/mappers/mapper';
import HashingPipe from 'src/application/pipes/hashing.pipe';
import { UserSchema } from 'src/domain/entities/userAggregate/user.entity';
import IHashingHandler from 'src/domain/handlers/ihashing.handler';
import UserController from '../controllers/user.controller';
import HashingHandler from '../handlers/hashing.handler';
import IAuthService from 'src/domain/services/iauth.service';
import AuthService from 'src/application/useCases/services/auth.service';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
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
      provide: 'IMapper',
      useValue: mapper,
    },

    // Pipes:
    HashingPipe,
  ],
})
export class AuthModule {}
