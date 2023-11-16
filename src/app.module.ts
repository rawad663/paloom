import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from '@modules/users/user.resolver';

import { AppService } from './app.service';
import { DatabaseService } from './db.service';
import { UserService } from './modules/users/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
  ],
  providers: [AppService, DatabaseService, UsersResolver, UserService],
  exports: [DatabaseService, UserService],
})
export class AppModule {}
