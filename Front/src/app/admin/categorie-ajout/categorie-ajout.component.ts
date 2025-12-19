import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategorieService } from '../../Services/categorie.service';

@Component({
  selector: 'app-categorie-ajout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,ReactiveFormsModule],
  templateUrl: './categorie-ajout.component.html',
  styleUrl: './categorie-ajout.component.scss'
})
export class CategorieAjoutComponent implements OnInit {
  data : any
   categorie!: FormGroup
    constructor( 
      private route: ActivatedRoute,
      private categorieService: CategorieService,
      private toastr: ToastrService,
    private formBuilder: FormBuilder,
  private router: Router) 
      {}
    
    ngOnInit() {
      this.categorie=this.formBuilder.group({
        nom:['',Validators.required],
        type:['',Validators.required]
  
  
      })
  
   }
   message: string = '';
   onSubmit() {
    if(this.categorie.valid){
      this.categorieService.createCategorie(this.categorie.value).subscribe({
      next: () => {
         //this.message = 'Article ajouté avec succès !';
        this.showSuccess('Article ajouter avec succés')
        this.ngOnInit();
        this.router.navigate(['/categorie']);
      },
      error: (err) => {
        // this.message = 'Erreur lors de l’envoi';
        this.showError("Erreur lors dez l'ajout")
      },
    });}
  }
  
  showSuccess(message:string){
    this.toastr.success(message,'success')
  }
  showError(message:string){
    this.toastr.error(message,'error')
  }
  
  onCancel() {
    this.router.navigate(['/categorie']);
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
