import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CandidatService } from '../../Services/candidat.service';
import { Observable } from 'rxjs';

interface Candidate {
  id: number;
  nom: string;
  prenom: string;
  formation: string;
  dateDebut: string;
  prix: string;
}
@Component({
  selector: 'app-candidats',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './candidats.component.html',
  styleUrl: './candidats.component.scss'
})
export class CandidatsComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nomFilter: string = '';
  prenomFilter: string = '';
  formationFilter: string = '';
  Candidats$: Observable<any[]>;

  constructor(private candidatService: CandidatService, private router: Router) {
    this.Candidats$ = this.candidatService.getCandidat();
  }

  getUniqueFormations(data: any[]): string[] {
    return data
      .map((x: any) => x.formationid?.titre)
      .filter((c: any, i: number, arr: any[]) => c && arr.indexOf(c) === i);
  }

  filterData(data: any[]): any[] {
    return data.filter((c: any) =>
      (!this.nomFilter || c.nom?.toLowerCase().includes(this.nomFilter.toLowerCase())) &&
      (!this.prenomFilter || c.prenom?.toLowerCase().includes(this.prenomFilter.toLowerCase())) &&
      (!this.formationFilter || c.formationid?.titre === this.formationFilter)
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
