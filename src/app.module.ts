import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { UsersResolver } from '@modules/users/user.resolver';
import { UserService } from '@modules/users/user.service';
import { DocumentService } from '@modules/documents/document.service';
import { DocumentsResolver } from '@modules/documents/document.resolver';

import { AppService } from './app.service';
import { DatabaseService } from './db.service';

const RESOLVERS = [UsersResolver, DocumentsResolver];

const SERVICES = [AppService, DatabaseService, UserService, DocumentService];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
  ],
  providers: [...RESOLVERS, ...SERVICES],
  exports: [...SERVICES.slice(1)],
})
export class AppModule {}
