import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { ActivatedRoute, Router }     from '@angular/router';
import { RouterLink }         from '@angular/router';
import { EntrepreneurService } from '../../Services/entrepreneur.service';



@Component({
  selector: 'app-entrepreneur-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './entrepreneur-details.component.html',
  styleUrls: ['./entrepreneur-details.component.scss']
})
export class EntrepreneurDetailsComponent implements OnInit {
  goBack() {
    window.history.back();
  }
  

  
  data : any
   idArticles: any
    constructor(private  entrepreneurService: EntrepreneurService, private route: ActivatedRoute,private router: Router) {}
    
    ngOnInit() {
      // this.loadArticleById();
      this.idArticles= this.route.snapshot.params['id']
      this.entrepreneurService.getEntrepreneurById(this.idArticles).subscribe((result : any)=>{
      this.data= result
      })
    }
    logout() {
  localStorage.removeItem('auth-token');
  this.router.navigate(['/login']);
}
}
