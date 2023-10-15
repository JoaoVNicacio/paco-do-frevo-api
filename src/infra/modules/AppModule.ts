import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/*/.entity{.ts,.js}'],
      synchronize:
        process.env.NODE_ENV === 'development'
          ? process.env.SYNCHRONIZE_DATABASE === 'true'
          : false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}