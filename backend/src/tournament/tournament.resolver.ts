import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TournamentService } from './tournament.service';
import { Tournament } from './schemas/tournament.schema';
import {
  CreateTournamentInput,
  UpdateTournamentInput,
  FilterTournamentInput,
} from './dto/tournament.input';

@Resolver(() => Tournament)
export class TournamentResolver {
  constructor(private readonly tournamentService: TournamentService) {}

  @Query(() => [Tournament], { name: 'tournaments' })
  async getTournaments(
    @Args('filter') filter: FilterTournamentInput,
  ): Promise<Tournament[]> {
    return this.tournamentService.findAll(filter);
  }

  @Query(() => Tournament, { name: 'tournament' })
  async getTournament(@Args('id') id: string): Promise<Tournament> {
    return this.tournamentService.findOneById(id);
  }

  @Mutation(() => Tournament, { name: 'createTournament' })
  async createTournament(
    @Args('input') input: CreateTournamentInput,
  ): Promise<Tournament> {
    return this.tournamentService.create(input);
  }

  @Mutation(() => Tournament, { name: 'updateTournament' })
  async updateTournament(
    @Args('id') id: string,
    @Args('input') input: UpdateTournamentInput,
  ): Promise<Tournament> {
    return this.tournamentService.update(id, input);
  }
}
