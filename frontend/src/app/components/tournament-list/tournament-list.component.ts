import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TournamentService } from '../../services/tournament.service';
import {
  Tournament,
  TournamentStatus,
} from '../../interfaces/tournament.interface';

@Component({
  selector: 'app-tournament-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tournament-list.component.html',
})
export class TournamentListComponent implements OnInit {
  tournaments: Tournament[] = [];
  statusFilter: TournamentStatus | null = null;
  TournamentStatus = TournamentStatus;

  constructor(
    private tournamentService: TournamentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    const filter = this.statusFilter
      ? { status: this.statusFilter }
      : undefined;
    console.log('LOAD TOURNAMENTS', filter);
    this.tournamentService
      .getTournaments(filter)
      .subscribe((data) => (this.tournaments = data));
  }

  onFilterChange(): void {
    this.loadTournaments();
  }

  editTournament(id: string): void {
    this.router.navigate(['/tournament/edit', id]);
  }
}
