import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import AssociationAddress from 'src/domain/entities/associationAggregate/address.entity';
import Association from 'src/domain/entities/associationAggregate/association.entity';
import { AssociationModule } from './association.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      entities: [Association, AssociationAddress],
      migrations: ['src/migration/**/*.ts'],
      subscribers: ['src/subscriber/**/*.ts'],
    }),
    AssociationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
