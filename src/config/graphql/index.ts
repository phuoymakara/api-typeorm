import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable, Logger } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  private logger = new Logger(GraphQLConfigService.name)
  createGqlOptions(): ApolloDriverConfig {
    return {
      //autoSchemaFile: './src/shema.gql',
      typePaths: ['./**/*.(graphql|gql)'],
      playground: process.env.NODE === 'production' ? false : true,
      formatError: (error: any) => {
        this.logger.log(error);
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
          code: error.extensions?.code || 'Internal server error',
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      },
    };
  }
}
