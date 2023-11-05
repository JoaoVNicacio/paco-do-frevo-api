import { EventModule } from './event.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import { AssociationModule } from './association.module';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import { PhoneNumberModule } from './phoneNumber.module';
import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import Member from 'src/domain/entities/associationAggregate/member.entity';

dotenv.config();

@Module({
  imports: [
    EventModule,
    PhoneNumberModule,
    AssociationModule,
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
      ],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
