import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../../Services/categorie.service';
import { FormationService } from '../../Services/formation.service';
import { ToastrService } from 'ngx-toastr';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../../Services/image.service';

@Component({
  selector: 'app-formation-modi',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,FormsModule,NgxEditorModule],
  templateUrl: './formation-modi.component.html',
  styleUrl: './formation-modi.component.scss'
})
export class FormationModiComponent implements OnInit {
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
  formationId!: number;
  categories: any;
  formation!: FormGroup;
   selectedFile: File | null = null;
   imagePreview: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private categorieService: CategorieService,
    private formationService: FormationService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
        private imageService: ImageService
  ) {}

  onCancel(): void {
    window.history.back();
  }

  ngOnInit(): void {
    this.formationId = this.route.snapshot.params['id'];
      this.editor = new Editor();
    this.formation = this.formBuilder.group({
      titre: ['', Validators.required],
      categorieid: ['', Validators.required],
      duree: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    });

    this.loadCategories();
    this.loadFormation();
    
  }
  onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

  loadCategories(): void {
    this.categorieService.getCategorieByType('FORMATION').subscribe((data: any) => {
      this.categories = data;
    });
  }

  loadFormation(): void {
    this.formationService.getFormationById(this.formationId).subscribe((data: any) => {
      this.formation.patchValue({
        titre: data.titre,
        categorieid: data.categorie?.id, // Pour éviter l'erreur LocalDateTime
        duree: data.duree,
        prix: data.prix,
        description: data.description,
        image: data.image
      });
      if (data.image) {
      this.imagePreview =data.image;
    }
    });
  }
updateFormation(values: any): void {
  this.formationService.updateFormation(this.formationId, values).subscribe({
    next: () => {
      this.showSuccess('Formation modifiée avec succès');
      this.router.navigate(['/admin-formation']);
    },
    error: () => {
      this.showError("Erreur lors de la modification de la formation");
    }
  });
}

  // onSubmit(): void {
  //   if (this.formation.valid) {
  //     const values = this.formation.value;
  //     values.categorieid = { id: values.categorieid };

  //     // Convertir date au format LocalDateTime si nécessaire
  //     if (values.dateDebut && !values.dateDebut.includes('T')) {
  //       values.dateDebut = values.dateDebut + 'T00:00:00';
  //     }

  //     this.formationService.updateFormation(this.formationId, values).subscribe({
  //       next: () => {
  //         this.showSuccess('Formation modifiée avec succès');
  //         this.router.navigate(['/admin-formation']);
  //       },
  //       error: () => {
  //         this.showError("Erreur lors de la modification de la formation");
  //       }
  //     });
  //   }
  // }
onSubmit(): void {
  if (!this.formation.valid) {
    this.showError("Formulaire invalide !");
    return;
  }

  const values = this.formation.value;
  values.categorieid = { id: values.categorieid };

  // Convertir la date si nécessaire
  if (values.dateDebut && !values.dateDebut.includes('T')) {
    values.dateDebut = values.dateDebut + 'T00:00:00';
  }

  // Cas 1 : une nouvelle image est sélectionnée → on l’upload d'abord
  if (this.selectedFile) {
    this.imageService.uploadImage(this.selectedFile).subscribe({
      next: (cheminImage: string) => {
        values.image = cheminImage; // on remplace l’image
        this.updateFormation(values);
      },
      error: () => this.toastr.error("Échec de l'envoi de l'image")
    });

  } else {
    // Cas 2 : aucune nouvelle image → on garde l’image actuelle
    this.updateFormation(values);
  }
}

  showSuccess(message: string): void {
    this.toastr.success(message, 'Succès');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Erreur');
  }

// formationId! : number
// categories:any
//    formation!: FormGroup
//     constructor( 
//       private route: ActivatedRoute,
//       private categorieService: CategorieService,
//       private formationService: FormationService,
//       private toastr: ToastrService,
//     private formBuilder: FormBuilder) 
//       {}
    
//     ngOnInit() {
//       this.formationId = this.route.snapshot.params['id'];

//       this.LoadsCategorieByType()
//       this.formation=this.formBuilder.group({
//         titre:['',Validators.required],
//         categorieid:['',Validators.required],
//         duree:[''],
//         prix:[''],
//         description:['',Validators.required],
//         image:['',]
  
        
//         // categorie = '';
//         // dateDebut = '';
//         // duree = '';
//         // prix = '';
//         // description = '';
//         // imageFile: File | null = null;
//         // statut = true;
//       })
  
//    }
//    LoadsCategorieByType(){
//      this.categorieService.getCategorieByType('FORMATION').subscribe((data:any) => {
//       this.categories =data})
      
//    }

//    loadFormation(): void {
//     this.formationService.getFormationById(this.formationId).subscribe((data: any) => {
//       this.formation.patchValue({
//         titre: data.titre,
//         categorieid: data.categorie?.id,
//         description: data.description,
//         image: data.image,
//         duree:data.duree,
//         prix: data.prix
//       });
//     });
//   }

//    message: string = '';
//    onSubmit() {
//     if(this.formation.valid){
//       var objet: {[id: string]: any}={ };
//       objet['id']=this.formation.value.categorieid;
//       this.formation.value.categorieid= objet;
//       const categorieId = this.formation.value.categorieid;
//       this.formation.patchValue({ categorieid: { id: categorieId } });
//       //this.formation.value.categorie= {id: this.categories.id}
//       this.formationService.updateFormation( this.formationId,this.formation.value).subscribe({
//       next: () => {
//          //this.message = 'Article ajouté avec succès !';
//         this.showSuccess('Article ajouter avec succés')
//         this.ngOnInit()
//       },
//       error: (err) => {
//         // this.message = 'Erreur lors de l’envoi';
//         this.showError("Erreur lors dez l'ajout")
//       },
//     });}
//   }
  
//   showSuccess(message:string){
//     this.toastr.success(message,'success')
//   }
//   showError(message:string){
//     this.toastr.error(message,'error')
//   }
}
