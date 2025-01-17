import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/tournament-list/tournament-list.component').then(
        (m) => m.TournamentListComponent
      ),
  },
  {
    path: 'tournament/create',
    loadComponent: () =>
      import('./components/tournament-form/tournament-form.component').then(
        (m) => m.TournamentFormComponent
      ),
  },
  {
    path: 'tournament/edit/:id',
    loadComponent: () =>
      import('./components/tournament-form/tournament-form.component').then(
        (m) => m.TournamentFormComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
