import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../Services/article.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogAComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  titreFilter: string = '';
  categorieFilter: string = '';

  articles$: Observable<any[]>;

  constructor(private articleService: ArticleService, private router: Router, private toastr: ToastrService) {
    this.articles$ = this.articleService.getArticles();
  }

  deleteArticle(id: any) {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      this.articleService.deleteArticle(id).subscribe({
        next: () => {
          this.showSuccess('Article supprimé avec succès.');
          this.articles$ = this.articleService.getArticles(); // refresh
        },
        error: (err) => {
          this.showError("Erreur lors de la suppression de l'Article.");
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
    return data.filter((a: any) =>
      (!this.titreFilter || a.titre?.toLowerCase().includes(this.titreFilter.toLowerCase())) &&
      (!this.categorieFilter || a.categorieid?.nom === this.categorieFilter)
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
