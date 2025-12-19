import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserServiceService } from '../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-administrateur',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './administrateur.component.html',
  styleUrl: './administrateur.component.scss'
})
export class AdministrateurComponent {
  nomFilter: string = '';
  prenomFilter: string = '';
  emailFilter: string = '';
  posteFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  users$: Observable<any[]>;

  constructor(
    private userService: UserServiceService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.users$ = this.userService.getUser();
  }
  
    
   ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/dashboard']);
      this.toastr.error('Accès réservé aux administrateurs.');
      return;
    }
    
  }
    

  deleteUser(id: any) {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.showSuccess('Utilisateur supprimé avec succès.');
          this.users$ = this.userService.getUser(); // refresh
        },
        error: (err) => {
          this.showError("Erreur lors de la suppression de l'Utilisateur.");
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

  filterData(data: any[]): any[] {
    return data.filter((a: any) =>
      (!this.nomFilter || a.lastmane?.toLowerCase().includes(this.nomFilter.toLowerCase())) &&
      (!this.prenomFilter || a.firstname?.toLowerCase().includes(this.prenomFilter.toLowerCase())) &&
      (!this.emailFilter || a.email?.toLowerCase().includes(this.emailFilter.toLowerCase())) &&
      (!this.posteFilter || a.poste?.toLowerCase().includes(this.posteFilter.toLowerCase()))
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
