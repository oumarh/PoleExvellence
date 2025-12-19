import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../Services/article.service';


@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogADetailsComponent implements OnInit {
  goBack() {
    window.history.back();
  }
  // article!: Article;

  // private articles: Article[] = [
  //   {
  //     id: 1,
  //     title: 'Communication digital',
  //     date: '24/04/2025',
  //     content: `
  //       Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque 
  //       laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto 
  //       beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur ...
  //     `,
  //     imageUrl: 'images/hero2.png'
  //   },
  //   {
  //     id: 2,
  //     title: 'Autre article',
  //     date: '25/04/2025',
  //     content: `Contenu de l'article…`,
  //     imageUrl: 'images/hero2.png'
  //   }
  //   // … autres articles
  // ];


  data : any
   idArticles: any
    constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit() {
      // this.loadArticleById();
      this.idArticles= this.route.snapshot.params['id']
      this.articleService.getArticleById(this.idArticles).subscribe((result : any)=>{
      this.data= result
      })
    }

    logout() {
      localStorage.removeItem('auth-token');
      this.router.navigate(['/login']);
    }
  }