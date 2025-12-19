import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OffreService } from '../../Services/offre.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-offre',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.scss'
})
export class OffreComponent {
  titreFilter: string = '';
  categorieFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  offres$: Observable<any[]>;

  constructor(private offreService: OffreService, private toastr: ToastrService, private router: Router) {
    this.offres$ = this.offreService.getOffre();
  }

  deleteOffre(id: any) {
    if (window.confirm('Voulez-vous vraiment supprimer cette offre ?')) {
      this.offreService.deleteOffre(id).subscribe({
        next: () => {
          this.showSuccess('Offre supprimée avec succès.');
          this.offres$ = this.offreService.getOffre();
        },
        error: (err) => {
          this.showError("Erreur lors de la suppression de l'offre.");
          console.error(err);
        }
      });
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Succès');
  }

  showError(message: string) {
    this.toastr.error(message, 'Erreur');
  }

  getUniqueCategories(data: any[]): string[] {
    return data
      .map((x: any) => x.categorieid?.nom)
      .filter((c: any, i: number, arr: any[]) => c && arr.indexOf(c) === i);
  }

  filterData(data: any[]): any[] {
    return data.filter((o: any) =>
      (!this.titreFilter || o.titre?.toLowerCase().includes(this.titreFilter.toLowerCase())) &&
      (!this.categorieFilter || o.categorieid?.nom === this.categorieFilter)
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
