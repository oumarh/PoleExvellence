 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CandidatService } from '../../Services/candidat.service';


@Component({
  selector: 'app-candidat-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './candidat-details.component.html',
  styleUrl: './candidat-details.component.scss'
})
export class CandidatDetailsComponent implements OnInit {
  goBack() {
    window.history.back();
  }


  data : any
     idArticles: any
      constructor(private  candidatService: CandidatService, private route: ActivatedRoute,private router: Router) {}
      
      ngOnInit() {
        // this.loadArticleById();
        this.idArticles= this.route.snapshot.params['id']
        this.candidatService.getCandidatById(this.idArticles).subscribe((result : any)=>{
        this.data= result
        })
      }
      logout() {
  localStorage.removeItem('auth-token');
  this.router.navigate(['/login']);
}
  
  }

