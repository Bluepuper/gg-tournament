import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TournamentModule } from './tournament/tournament.module';
import { environment } from './env';

@Module({
  imports: [
    MongooseModule.forRoot(environment.DATABASE_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    TournamentModule,
  ],
})
export class AppModule {}
