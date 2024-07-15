import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  //constructor(private config: ConfigSer)
  createGqlOptions(): ApolloDriverConfig {
    return {
      //autoSchemaFile: './src/shema.gql',
      typePaths: ['./**/*.(graphql|gql)'],
      playground: process.env.NODE === 'production' ? false : true
    };
  }
}
