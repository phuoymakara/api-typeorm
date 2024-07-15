import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from '../common/intercepter/auth.intercepter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '../config/';
import { GraphQLConfigService } from '../config';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphQLConfigService
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
      dataSourceFactory: async (option) => {
        const datasource = await new DataSource(option).initialize();
        return datasource;
      }
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor
    }
  ]
})
export class AppModule {}
