export enum TournamentStatus {
  ONGOING = 'ONGOING',
  UPCOMING = 'UPCOMING',
  COMPLETED = 'COMPLETED',
}

export interface Tournament {
  _id: string;
  name: string;
  status: TournamentStatus;
}

export interface TournamentFilter {
  status?: TournamentStatus;
}
