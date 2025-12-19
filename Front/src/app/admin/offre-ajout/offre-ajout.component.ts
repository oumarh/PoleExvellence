import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../../Services/categorie.service';
import { OffreService } from '../../Services/offre.service';
import { ToastrService } from 'ngx-toastr';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { ImageService } from '../../Services/image.service';

@Component({
  selector: 'app-offre-ajout',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,NgxEditorModule],
  templateUrl: './offre-ajout.component.html',
  styleUrl: './offre-ajout.component.scss'
})
export class OffreAjoutComponent  implements OnInit{
   editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    [{ heading: ['h1', 'h2', 'h3'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
  ];
data : any
categories:any
   offre!: FormGroup   
   selectedFile: File | null = null;
    constructor( 
      private route: ActivatedRoute,
      private categorieService: CategorieService,
      private offreService: OffreService,
      private toastr: ToastrService,
    private formBuilder: FormBuilder,
     private imageService: ImageService,
        private router: Router) 
      {}
  onCancel() {
    this.router.navigate(['/offre']);
  }

      ngOnInit() {
        
      this.editor = new Editor();
            this.LoadsCategorieByType()
            this.offre=this.formBuilder.group({
              titre:['',Validators.required],
              categorieid:['',Validators.required],
              dateDebut:[''], 
              prix:['',Validators.required],
              description:['',Validators.required],
              image:['',]
            })
  
          }
          onFileSelected(event: any): void {
            const file: File = event.target.files[0];
            if (file) {
              this.selectedFile = file;
              
            }
          }
          LoadsCategorieByType(){
            this.categorieService.getCategorieByType('OFFRE').subscribe((data:any) => {
             this.categories =data})
             
          }
          message: string = '';

          onSubmit(): void {
            if (!this.offre.valid) {
              this.showError("Formulaire invalide !");
              return;
            }
          
           
            const values = this.offre.value;
          
              values.categorieid = { id: values.categorieid };
            // Si une image est sélectionnée, on l'upload d'abord
              if (this.selectedFile) {
                this.imageService.uploadImage(this.selectedFile).subscribe({
                  next: (cheminImage: string) => {
                    values.image = cheminImage;
                    this.offreService.createOffre(values).subscribe({
                      next: () => {
                        this.showSuccess('Offre ajoutée avec succès');
                        this.ngOnInit();
                        this.router.navigate(['/admin-blog']);
                      },
                      error: () => this.showError("Erreur lors de l'ajout de l'offre")
                    });
                  },
                  error: () => this.showError("Échec de l'envoi de l'image, veuillez choisir une image!")
                });
              } else {
              this.offreService.createOffre(values).subscribe({
                next: () => {
                  this.showSuccess('Offre ajoutée avec succès');
                  this.ngOnInit();
                  this.router.navigate(['/offre']);
                },
                error: () => this.showError("Erreur lors de l'ajout de l'offre")
              });
            }
            
        
          }

  //  onSubmit() {
  //   if(this.offre.valid){
  //     var objet: {[id: string]: any}={ };
  //     objet['id']=this.offre.value.categorieid;
  //     this.offre.value.categorieid= objet;
  //     //this.formation.value.categorie= {id: this.categories.id}
  //     this.offreService.createOffre(this.offre.value).subscribe({
  //     next: () => {
  //        //this.message = 'Article ajouté avec succès !';
  //       this.showSuccess('Article ajouter avec succés')
  //       this.ngOnInit()
  //     },
  //     error: (err) => {
  //       // this.message = 'Erreur lors de l’envoi';
  //       this.showError("Erreur lors dez l'ajout")
  //     },
  //   });}
  // }
  
  showSuccess(message:string){
    this.toastr.success(message,'success')
  }
  showError(message:string){
    this.toastr.error(message,'error')
  }
//  // Modèle du formulaire
//  titre = '';
//  dateDebut = '';
//  description = '';
//  imageFile: File | null = null;
//  statut = false;

//  onFileSelected(event: Event) {
//    const input = event.target as HTMLInputElement;
//    this.imageFile = input.files && input.files.length ? input.files[0] : null;
//  }

//  onSubmit() {
//    const formData = new FormData();
//    formData.append('titre', this.titre);
//    formData.append('dateDebut', this.dateDebut);
//    formData.append('description', this.description);
//    if (this.imageFile) {
//      formData.append('image', this.imageFile);
//    }
//    formData.append('statut', this.statut ? '1' : '0');

//    // TODO : envoyez formData à votre API
//    console.log('Nouvelle offre:', {
//      titre: this.titre,
//      dateDebut: this.dateDebut,
//      description: this.description,
//      imageFile: this.imageFile,
//      statut: this.statut
//    });
//  }
}
