import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EntrepreneurService } from '../../Services/entrepreneur.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-entrepreneur',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './entrepreneur.component.html',
  styleUrl: './entrepreneur.component.scss'
})
export class EntrepreneurComponent {

  currentPage: number = 1;
  itemsPerPage: number = 10;
  nomFilter: string = '';
  prenomFilter: string = '';
  offreFilter: string = '';
  Entrepeneur$: Observable<any[]>;
  constructor(private entrepreneurService: EntrepreneurService, private router: Router) {
    this.Entrepeneur$ = this.entrepreneurService.getEntrepreneur();
  }

  getUniqueOffres(data: any[]): string[] {
    return data
      .map((x: any) => x.offreid?.titre)
      .filter((c: any, i: number, arr: any[]) => c && arr.indexOf(c) === i);
  }

  filterData(data: any[]): any[] {
    return data.filter((e: any) =>
      (!this.nomFilter || e.nom?.toLowerCase().includes(this.nomFilter.toLowerCase())) &&
      (!this.prenomFilter || e.prenom?.toLowerCase().includes(this.prenomFilter.toLowerCase())) &&
      (!this.offreFilter || e.offreid?.titre === this.offreFilter)
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
