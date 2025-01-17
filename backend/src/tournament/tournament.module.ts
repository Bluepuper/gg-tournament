import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentResolver } from './tournament.resolver';
import { TournamentService } from './tournament.service';
import { Tournament, TournamentSchema } from './schemas/tournament.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tournament.name, schema: TournamentSchema },
    ]),
  ],
  providers: [TournamentResolver, TournamentService],
})
export class TournamentModule {}
