import { InputType, Field } from '@nestjs/graphql';
import { TournamentStatus } from '../schemas/tournament.schema';

@InputType()
export class CreateTournamentInput {
  @Field()
  name: string;

  @Field(() => TournamentStatus)
  status: TournamentStatus;
}

@InputType()
export class UpdateTournamentInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => TournamentStatus, { nullable: true })
  status?: TournamentStatus;
}

@InputType()
export class FilterTournamentInput {
  @Field(() => TournamentStatus, { nullable: true })
  status?: TournamentStatus;
}
