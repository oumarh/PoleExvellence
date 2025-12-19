import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';
import { FormationService } from '../../Services/formation.service';



@Component({
  selector: 'app-formation-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './formation-details.component.html',
  styleUrl: './formation-details.component.scss'
})
export class FormationADetailsComponent {
  goBack() {
    window.history.back();
  }
 
   data : any
     idArticles: any
      constructor(private  formationService: FormationService, private route: ActivatedRoute, private router: Router) {}
      
      ngOnInit() {
        // this.loadArticleById();
        this.idArticles= this.route.snapshot.params['id']
        this.formationService.getFormationById(this.idArticles).subscribe((result : any)=>{
        this.data= result
        })
      }
      logout() {
  localStorage.removeItem('auth-token');
  this.router.navigate(['/login']);
}
}
