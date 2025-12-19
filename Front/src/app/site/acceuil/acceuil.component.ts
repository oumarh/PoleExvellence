import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../../Services/article.service';
import { FormationDetailComponent } from '../formation-detail/formation-detail.component';
import { FormationService } from '../../Services/formation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent {
article$: Observable<any[]>;
  formation$: Observable<any[]>;

  constructor(private articleService: ArticleService, private formationService: FormationService) {
    this.article$ = this.articleService.getArticles();
    this.formation$ = this.formationService.getFormation();
  }
}

