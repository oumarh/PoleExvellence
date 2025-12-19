import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormationService } from '../../Services/formation.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss'
})
export class FormationAComponent {
  

  currentPage: number = 1;
  itemsPerPage: number = 10;
  titreFilter: string = '';
  categorieFilter: string = '';
  Formation$: Observable<any[]>;
  constructor(private formationService: FormationService, private toastr: ToastrService, private router: Router,) {
    this.Formation$ = this.formationService.getFormation();
  }

  getUniqueCategories(data: any[]): string[] {
    return data
      .map((x: any) => x.categorieid?.nom)
      .filter((c: any, i: number, arr: any[]) => c && arr.indexOf(c) === i);
  }

  filterData(data: any[]): any[] {
    return data.filter((f: any) =>
      (!this.titreFilter || f.titre?.toLowerCase().includes(this.titreFilter.toLowerCase())) &&
      (!this.categorieFilter || f.categorieid?.nom === this.categorieFilter)
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
     
    deleteFormation(id: any) {
      if (window.confirm('Voulez-vous vraiment supprimer cette formation ?')) {
        this.formationService.deleteFormation(id).subscribe({
          next: () => {
            this.showSuccess('Formation supprimée avec succès.');
            this.Formation$ = this.formationService.getFormation();
          },
          error: (err) => {
            this.showError("Erreur lors de la suppression de la Formation.");
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

    logout() {
      localStorage.removeItem('auth-token');
      this.router.navigate(['/login']);
    }

  // view(f: Formation) {
  //   this.router.navigate(['/admin-formation-details']);
  // }

  // edit(f: data) {
  //   this.router.navigate(['/dashboard/formations/edit', f.id]);
  // }

  // delete(f: Formation) {
  //   if (confirm(`Supprimer la formation "${f.titre}" ?`)) {
  //     this.formations = this.formations.filter(x => x.id !== f.id);
  //     // ici vous appelleriez votre service pour supprimer côté serveur
  //   }
  // }
}
