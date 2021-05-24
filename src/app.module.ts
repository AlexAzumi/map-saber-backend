import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapsModule } from './maps/maps.module';
import ormConfig from './orm.config';
import ormConfigProd from './orm.config.prod';
import { UsersModule } from './users/users.module';
import { DifficultiesModule } from './difficulties/difficulties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),

    MapsModule,
    UsersModule,
    DifficultiesModule,
  ],
  controllers: [],
})
export class AppModule {}
