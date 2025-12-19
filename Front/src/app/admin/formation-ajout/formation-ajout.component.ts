import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../../Services/categorie.service';
import { FormationService } from '../../Services/formation.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { environnement } from '../../../environnement/environnement';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { ImageService } from '../../Services/image.service';

@Component({
  selector: 'app-formation-ajout',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,NgxEditorModule],
  templateUrl: './formation-ajout.component.html',
  styleUrl: './formation-ajout.component.scss'
})
export class FormationAjoutComponent implements OnInit {
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list','format_clear'],
    ['code', 'blockquote'],
    [{ heading: ['h1', 'h2', 'h3'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right'],
  ];
data : any
categories:any
   formation!: FormGroup
   selectedFile: File | null = null;
   private apiUrl = environnement.baseUrl
    constructor( 
      private route: ActivatedRoute,
      private categorieService: CategorieService,
      private formationService: FormationService,
      private toastr: ToastrService,
    private formBuilder: FormBuilder,
   private imageService: ImageService,
  private router: Router) 
      {}
    
    ngOnInit() {
      this.editor = new Editor();
      this.LoadsCategorieByType();
      this.formation = this.formBuilder.group({
        titre: ['', Validators.required],
        categorieid: ['', Validators.required],
        dateDebut: [''],
        duree: ['', Validators.required],
        prix: ['', Validators.required],
        description: ['', Validators.required],
        image: ['']
      });
    }

    onCancel(): void {
      window.history.back();
    }
   onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
    }
  }
   LoadsCategorieByType(){
     this.categorieService.getCategorieByType('FORMATION').subscribe((data:any) => {
      this.categories =data})
      
   }
  
  
  
  showSuccess(message:string){
    this.toastr.success(message,'success')
  }
  showError(message:string){
    this.toastr.error(message,'error')
  }
  
  message: string = '';

  onSubmit(): void {
    if (!this.formation.valid) {
      this.showError("Formulaire invalide !");
      return;
    }
  
    
  
    const values = this.formation.value;
  
  
      values.categorieid = { id: values.categorieid };
      // Si une image est sélectionnée, on l'upload d'abord
              if (this.selectedFile) {
                this.imageService.uploadImage(this.selectedFile).subscribe({
                  next: (cheminImage: string) => {
                    values.image = cheminImage;
                    this.formationService.createFormation(values).subscribe({
                      next: () => {
                        this.showSuccess('Formation ajoutée avec succès');
                        this.ngOnInit();
                        this.router.navigate(['/admin-blog']);
                      },
                      error: () => this.showError("Erreur lors de l'ajout de la formation")
                    });
                  },
                  error: () => this.showError("Échec de l'envoi de l'image, veuillez choisir une image!")
                });
              } else {
                // Pas d'image : on créé directement l'article

      this.formationService.createFormation(values).subscribe({
        next: () => {
          this.showSuccess('Formation ajoutée avec succès');
          this.ngOnInit();
          this.router.navigate(['/admin-formation']);
        },
        error: () => this.showError("Erreur lors de l'ajout de la formation")
      });
    }

  }
  
}
