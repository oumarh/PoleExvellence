import { Component, OnInit } from '@angular/core';
import { OffreService } from '../../Services/offre.service';
import { ActivatedRoute } from '@angular/router';
import { EntrepreneurService } from '../../Services/entrepreneur.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entrepreunariat-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './entrepreunariat-detail.component.html',
  styleUrl: './entrepreunariat-detail.component.scss'
})
export class EntrepreunariatDetailComponent implements OnInit{
  goBack() {
    window.history.back();
  }
data : any
 idOffres: any
 entrepreneur!: FormGroup
  constructor(
    private offreService: OffreService, 
    private route: ActivatedRoute,
    private entrepreneurService: EntrepreneurService,
    private toastr: ToastrService,
  private formBuilder: FormBuilder) 
    {}
  
  ngOnInit() {
    this.entrepreneur=this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      email:['',Validators.required],
      telephone:['',Validators.required],
      address:['',],
      profession:['',],
      organisation:['',],
      activite:['',],
      offreid:['']


    })
    // this.loadArticleById();
    this.idOffres= this.route.snapshot.params['id']
    this.offreService.getOffreById(this.idOffres).subscribe((result : any)=>{
    this.data= result
    })

 }
 message: string = '';
 onSubmit() {
  if(this.entrepreneur.valid){
    this.entrepreneur.value.offreid = { id: this.idOffres}
    this.entrepreneurService.createEntrepreneur(this.entrepreneur.value).subscribe({
    next: () => {
       //this.message = 'Article ajouté avec succès !';
      this.showSuccess('Article ajouter avec succés')
      this.ngOnInit()
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
}