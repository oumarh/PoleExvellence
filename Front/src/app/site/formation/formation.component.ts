import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormationService } from '../../Services/formation.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss'
})
export class FormationComponent {
  nameFilter = '';
  durationFilter = '';
  categoryFilter = '';
  currentPage = 1;
  itemsPerPage = 6;

  durations = ['1 mois', '3 mois', '6 mois', '12 mois'];

  // ✅ Formation observable
  formation$: Observable<any[]>;

  constructor(private formationService: FormationService) {
    this.formation$ = this.formationService.getFormation();
  }

  applyFilter(): void {
    this.currentPage = 1;
  }

  getUniqueCategories(data: any[]): string[] {
    return data
      .map((x: any) => x.categorieid?.nom)
      .filter((c, i, arr) => c && arr.indexOf(c) === i);
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