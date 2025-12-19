import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../Services/article.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  nameFilter = '';
  categoryFilter = '';
  DateFilter: string = '';

  currentPage = 1;
  itemsPerPage = 6;

  // ✅ Observable contenant les articles
  article$: Observable<any[]>;

  constructor(private articleService: ArticleService) {
    this.article$ = this.articleService.getArticles();
  }

  // ✅ Méthode pour extraire les catégories uniques
  getUniqueCategories(data: any[]): string[] {
    return data
      .map(article => article.categorieid?.nom)
      .filter((nom, i, arr) => nom && arr.indexOf(nom) === i);
  }

  // ✅ Méthode de filtrage
  filterData(data: any[]): any[] {
    return data.filter((off: any) =>
      (!this.nameFilter || off.titre?.toLowerCase().includes(this.nameFilter.toLowerCase())) &&
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

  applyFilter(): void {
    this.currentPage = 1;
  }
}
