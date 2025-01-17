import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { TournamentStatus } from '../../interfaces/tournament.interface';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './tournament-form.component.html',
})
export class TournamentFormComponent implements OnInit {
  tournamentForm: FormGroup;
  isEditMode = false;
  tournamentId: string | null = null;
  TournamentStatus = TournamentStatus;

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.tournamentId = this.route.snapshot.paramMap.get('id');
    if (this.tournamentId) {
      this.isEditMode = true;
      this.loadTournament();
    }
  }

  loadTournament(): void {
    if (this.tournamentId) {
      this.tournamentService
        .getTournamentById(this.tournamentId)
        .subscribe((tournament) => {
          this.tournamentForm.patchValue({
            name: tournament.name,
            status: tournament.status,
          });
        });
    }
  }

  onSubmit(): void {
    if (this.tournamentForm.valid) {
      const { name, status } = this.tournamentForm.value;

      if (this.isEditMode && this.tournamentId) {
        this.tournamentService
          .updateTournament(this.tournamentId, name, status)
          .subscribe(() => this.router.navigate(['/']));
      } else {
        this.tournamentService
          .createTournament(name, status)
          .subscribe(() => this.router.navigate(['/']));
      }
    }
  }
}
