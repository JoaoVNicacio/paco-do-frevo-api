import { UserModule } from './user.module';
import { EventModule } from './event.module';
import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import AssociationAddress from 'src/domain/aggregates/associationAggregate/address.entity';
import Association from 'src/domain/aggregates/associationAggregate/association.entity';
import { AssociationModule } from './association.module';
import Event from 'src/domain/aggregates/associationAggregate/event.entity';
import { PhoneNumberModule } from './phone-number.module';
import PhoneNumber from 'src/domain/aggregates/associationAggregate/phone-number.entity';
import Contact from 'src/domain/aggregates/associationAggregate/contact.entity';
import Member from 'src/domain/aggregates/associationAggregate/member.entity';
import { ContactModule } from './contact.module';
import SocialNetwork from 'src/domain/aggregates/associationAggregate/social-network.entity';
import { SocialNetworkModule } from './social-network.module';
import OtherFrevoEntity from 'src/domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity.entity';
import OtherFrevoEntityAddress from 'src/domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import { OtherFrevoEntityModule } from './other-frevo-entity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth.module';

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
      autoLoadEntities: true,
      entities: [
        Association,
        AssociationAddress,
        Event,
        Member,
        PhoneNumber,
        Contact,
        Event,
        SocialNetwork,
        OtherFrevoEntity,
        OtherFrevoEntityAddress,
      ],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
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
