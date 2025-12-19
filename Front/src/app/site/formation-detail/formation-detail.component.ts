  import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../Services/formation.service';
import { ActivatedRoute } from '@angular/router';
import { CandidatService } from '../../Services/candidat.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formation-detail',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ReactiveFormsModule,],
  templateUrl: './formation-detail.component.html',
  styleUrl: './formation-detail.component.scss'
})
export class FormationDetailComponent implements OnInit {
  goBack() {
    window.history.back();
  }
data : any
 idFormation: any
 candidats!: FormGroup
  constructor(
    private formationService: FormationService, 
    private route: ActivatedRoute,
    private candidatService: CandidatService,
    private toastr: ToastrService,
  private formBuilder: FormBuilder) 
    { }
      
      
    
  
  ngOnInit() {

    this.candidats=this.formBuilder.group({
      nom:['',Validators.required],
      prenom:['',Validators.required],
      email:['',Validators.required],
      telephone:['',Validators.required],
      address:['',],
      profession:['',],
      organisation:['',],
      specialisation:['',],
      formationid:['']
    });

    // this.loadArticleById();
    this.idFormation= this.route.snapshot.params['id']
    this.formationService.getFormationById(this.idFormation).subscribe((result : any)=>{
    this.data= result
    })

 }
 message: string = '';
 onSubmit() {
  if(this.candidats.valid){
    this.candidats.value.formationid = { id: this.idFormation}
  this.candidatService.createCandidat(this.candidats.value).subscribe({
    next: (res) => {
      // this.message = 'Article ajouté avec succès !';
      this.showSuccess('Article ajouter avec succés')
      this.ngOnInit()
    },
    error: (err) => {
      console.error(err);
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
