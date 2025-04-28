import { UserModule } from './user.module';
import { EventModule } from './event.module';
import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AssociationModule } from './association.module';
import { PhoneNumberModule } from './phone-number.module';
import { ContactModule } from './contact.module';
import { SocialNetworkModule } from './social-network.module';
import { OtherFrevoEntityModule } from './other-frevo-entity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth.module';
import AssociationDBSchema from '../schemas/associationAggregate/association.schema';
import AssociationAddressDBSchema from '../schemas/associationAggregate/address.schema';
import MemberDBSchema from '../schemas/associationAggregate/member.schema';
import EventDBSchema from '../schemas/associationAggregate/event.schema';
import PhoneNumberDBSchema from '../schemas/associationAggregate/phone-number.schema';
import ContactDBSchema from '../schemas/associationAggregate/contact.schema';
import SocialNetworkDBSchema from '../schemas/associationAggregate/social-network.schema';
import OtherFrevoEntityDBSchema from '../schemas/otherFrevoMakersAggregate/other-frevo-entity.schema';
import OtherFrevoEntityAddressDBSchema from '../schemas/otherFrevoMakersAggregate/other-frevo-entity-address.schema';

dotenv.config();

@Module({
  imports: [
    // Application Modules:
    EventModule,
    PhoneNumberModule,
    AssociationModule,
    ContactModule,
    SocialNetworkModule,
    OtherFrevoEntityModule,
    UserModule,
    AuthModule,

    // TypeORM config:
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: true,
      logging: true,
      autoLoadEntities: false,
      entities: [
        AssociationDBSchema,
        AssociationAddressDBSchema,
        EventDBSchema,
        MemberDBSchema,
        PhoneNumberDBSchema,
        ContactDBSchema,
        EventDBSchema,
        SocialNetworkDBSchema,
        OtherFrevoEntityDBSchema,
        OtherFrevoEntityAddressDBSchema,
      ],
      migrations: ['src/infra/migrations/**/*.ts'],
      subscribers: ['src/infra/subscribers/**/*.ts'],
    }),

    // MongoDB Config:
    MongooseModule.forRoot(process.env.MONGO_DB_URL),

    // Redis Cache config:
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT!),
            tls: true,
          },
          password: process.env.REDIS_PASSWORD,
        }),
        // ttl: 10000,
      }),
    }),
  ],
  controllers: [],
  providers: [
    // Loggers:
    ConsoleLogger,
  ],
})
export class AppModule {}
