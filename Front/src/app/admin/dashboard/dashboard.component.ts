import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormationService } from '../../Services/formation.service';
import { CandidatService } from '../../Services/candidat.service';
import { EntrepreneurService } from '../../Services/entrepreneur.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth-service.service';

interface Candidate {
  id: number;
  nom: string;
  prenom: string;
  formation: string;
  pays: string;
  date: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userName: string | null = null;
  Candidats$: Observable<any[]>;
  CandidatsCount$: Observable<number>;
  EntrepreneursCount$: Observable<number>;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nomFilter: string = '';
  prenomFilter: string = '';
  formationFilter: string = '';
  constructor(
    private candidatService: CandidatService,
    private entrepreneurService: EntrepreneurService,
    private router: Router,
    private authService: AuthService
  ) {
    this.Candidats$ = this.candidatService.getCandidat();
    this.CandidatsCount$ = this.candidatService.getCandidatCount();
    this.userName = this.authService.getUserName();
    this.EntrepreneursCount$ = this.entrepreneurService.getEntrepreneurCount();
  }

  getUniqueFormations(data: any[]): string[] {
    return data
      .map((x: any) => x.formationid?.titre)
      .filter((c: any, i: number, arr: any[]) => c && arr.indexOf(c) === i);
  }

  filterData(data: any[]): any[] {
    return data.filter((cand: any) =>
      (!this.nomFilter || cand.nom?.toLowerCase().includes(this.nomFilter.toLowerCase())) &&
      (!this.prenomFilter || cand.prenom?.toLowerCase().includes(this.prenomFilter.toLowerCase())) &&
      (!this.formationFilter || cand.formationid?.titre === this.formationFilter)
    );
  }

  getPaginatedData(data: any[]): any[] {
    const filtered = this.filterData(data);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(data: any[]): number {
    return Math.ceil(this.filterData(data).length / this.itemsPerPage) || 1;
  }

  changePage(page: number, data: any[]): void {
    if (page >= 1 && page <= this.getTotalPages(data)) {
      this.currentPage = page;
    }
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}

