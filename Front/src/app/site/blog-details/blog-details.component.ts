import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { CommonModule }       from '@angular/common';
import { RouterLink }         from '@angular/router';
import { ArticleService } from '../../Services/article.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  // post!: BlogPost;

  // // Exemple statique à remplacer par votre service
  // private posts: BlogPost[] = [
  //   {
  //     id: 1,
  //     title: 'Titre de l’article 1',
  //     content: `
  //       Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  //       Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
  //       Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
  //     `,
  //     image: 'images/hero2.png'
  //   },
  //   {
  //     id: 2,
  //     title: 'Titre de l’article 2',
  //     content: `
  //       Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  //       Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  //     `,
  //     image: 'assets/blog2-hero.jpg'
  //   }
  //   // … autres articles
  // ];
 data : any
 idArticles: any
 contenuSecurise!: SafeHtml;
  constructor(private articleService: ArticleService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    // this.loadArticleById();
    this.idArticles= this.route.snapshot.params['id']
    this.articleService.getArticleById(this.idArticles).subscribe((result : any)=>{
    this.data= result
    })
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.post = this.posts.find(p => p.id === id) ?? this.posts[0];
  }
  // Pour securiser le rendu de data.contenu avant interpreter son html en text
  ngOnChanges() {
    if (this.data?.contenu) {
      this.contenuSecurise = this.sanitizer.bypassSecurityTrustHtml(this.data.contenu);
    }
  }
  
    // loadArticleById(){
    //   const id = Number(this.route.snapshot.paramMap.get('id'));
    //   return this.articleService.getArticleById(id).subscribe((result:any)=> {
    //     this.data= result;
    //   });
    // }
   

  
}
