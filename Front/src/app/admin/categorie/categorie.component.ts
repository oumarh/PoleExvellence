import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategorieService } from '../../Services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

interface Category {
  id: number;
  nom: string;
  type: string;
  dateCreation: string;
}
@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  nomFilter: string = '';
  typeFilter: string = '';
  Categories$: Observable<any[]>;
  constructor(private categorieService: CategorieService, private toastr: ToastrService, private router: Router) {
    this.Categories$ = this.categorieService.getCategorie();
  }
        
  deleteCategorie(id: any) {
    if (window.confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categorieService.deleteCategorie(id).subscribe({
        next: () => {
          this.showSuccess('Categorie supprimée avec succès.');
           this.Categories$ = this.categorieService.getCategorie(); // refresh
        },
        error: (err) => {
          this.showError("Erreur lors de la suppression de la Categorie.");
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


  getUniqueTypes(data: any[]): string[] {
    return data
      .map((x: any) => x.type)
      .filter((t: any, i: number, arr: any[]) => t && arr.indexOf(t) === i);
  }

  filterData(data: any[]): any[] {
    return data.filter((cat: any) =>
      (!this.nomFilter || cat.nom?.toLowerCase().includes(this.nomFilter.toLowerCase())) &&
      (!this.typeFilter || cat.type === this.typeFilter)
    );
  }

  getPaginatedData(data: any[]): any[] {
    const filtered = this.filterData(data);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(data: any[]): number {
    return data ? Math.ceil(data.length / this.itemsPerPage) : 1;
  }

  changePage(page: number, data: any[]): void {
    if (page >= 1 && page <= this.getTotalPages(data)) {
      this.currentPage = page;
    }
  }

  // Méthode changePage obsolète supprimée (remplacée par la version prenant data en paramètre)
  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
