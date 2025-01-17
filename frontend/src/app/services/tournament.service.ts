import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import {
  Tournament,
  TournamentFilter,
} from '../interfaces/tournament.interface';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  constructor(private apollo: Apollo) {
    console.log('TournamentService constructed', !!apollo);
  }

  getTournaments(filter: TournamentFilter = {}): Observable<Tournament[]> {
    return this.apollo
      .watchQuery<{ tournaments: Tournament[] }>({
        query: gql`
          query GetTournaments($filter: FilterTournamentInput!) {
            tournaments(filter: $filter) {
              _id
              name
              status
            }
          }
        `,
        variables: { filter },
      })
      .valueChanges.pipe(map((result) => result.data.tournaments));
  }

  createTournament(name: string, status: string): Observable<Tournament> {
    return this.apollo
      .mutate<{ createTournament: Tournament }>({
        mutation: gql`
          mutation CreateTournament($input: CreateTournamentInput!) {
            createTournament(input: $input) {
              _id
              name
              status
            }
          }
        `,
        variables: {
          input: { name, status },
        },
      })
      .pipe(map((result) => result.data!.createTournament));
  }

  updateTournament(
    id: string,
    name: string,
    status: string
  ): Observable<Tournament> {
    return this.apollo
      .mutate<{ updateTournament: Tournament }>({
        mutation: gql`
          mutation UpdateTournament(
            $id: String!
            $input: UpdateTournamentInput!
          ) {
            updateTournament(id: $id, input: $input) {
              _id
              name
              status
            }
          }
        `,
        variables: {
          id,
          input: { name, status },
        },
      })
      .pipe(map((result) => result.data!.updateTournament));
  }

  getTournamentById(id: string): Observable<Tournament> {
    return this.apollo
      .watchQuery<{ tournament: Tournament }>({
        query: gql`
          query GetTournament($id: String!) {
            tournament(id: $id) {
              _id
              name
              status
            }
          }
        `,
        variables: { id },
      })
      .valueChanges.pipe(map((result) => result.data.tournament));
  }
}
