import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OffreService } from '../../Services/offre.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-entrepreunariat',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink],
  templateUrl: './entrepreunariat.component.html',
  styleUrl: './entrepreunariat.component.scss'
})
export class EntrepreunariatComponent {
  nameFilter = '';
  durationFilter = '';
  categoryFilter = '';
  currentPage = 1;
  itemsPerPage = 6;

  durations = ['1 mois', '3 mois', '6 mois', '12 mois'];

  // ✅ Offres en Observable
  offres$: Observable<any[]>;

  constructor(private offreService: OffreService) {
    this.offres$ = this.offreService.getOffre();
  }

  applyFilter(): void {
    this.currentPage = 1;
  }

  getUniqueCategories(data: any[]): string[] {
    return data
      .map(offre => offre.categorieid?.nom)
      .filter((nom, i, arr) => nom && arr.indexOf(nom) === i);
  }

  filterData(data: any[]): any[] {
    return data.filter((off: any) =>
      (!this.nameFilter || off.titre?.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
      (!this.durationFilter || off.duree === this.durationFilter) &&
      (!this.categoryFilter || off.categorieid?.nom === this.categoryFilter)
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
}