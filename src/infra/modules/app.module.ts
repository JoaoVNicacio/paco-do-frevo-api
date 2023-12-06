import { EventModule } from './event.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import { AssociationModule } from './association.module';
import Event from 'src/domain/entities/associationAggregate/event.entity';
import { PhoneNumberModule } from './phone-number.module';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import Member from 'src/domain/entities/associationAggregate/member.entity';
import { ContactModule } from './contact.module';
import SocialNetwork from 'src/domain/entities/associationAggregate/social-network.entity';
import { SocialNetworkModule } from './social-network.module';
import OtherFrevoEntity from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity.entity';
import OtherFrevoEntityAddress from 'src/domain/entities/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import { OtherFrevoEntityModule } from './other-frevo-entity.module';

dotenv.config();

@Module({
  imports: [
    EventModule,
    PhoneNumberModule,
    AssociationModule,
    ContactModule,
    SocialNetworkModule,
    OtherFrevoEntityModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
