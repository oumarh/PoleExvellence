import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { OffreService } from '../../Services/offre.service';



@Component({
  selector: 'app-offre-details',
  standalone: true,
  imports: [CommonModule, RouterLink],  // <-- Virgule entre les imports
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.scss']  // <-- Utilisation de styleUrls
})
export class OffreDetailsComponent implements OnInit {  // <-- Espace avant implements
  
    goBack() {
      window.history.back();
    }

   data : any
       idArticles: any
        constructor(private  offreService: OffreService, private route: ActivatedRoute, private router: Router) {}
        
        ngOnInit() {
          // this.loadArticleById();
          this.idArticles= this.route.snapshot.params['id']
          this.offreService.getOffreById(this.idArticles).subscribe((result : any)=>{
          this.data= result
          })
        }

        logout() {
          localStorage.removeItem('auth-token');
          this.router.navigate(['/login']);
        }
}
