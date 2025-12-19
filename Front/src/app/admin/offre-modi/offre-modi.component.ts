
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OffreService } from '../../Services/offre.service';
import { CategorieService } from '../../Services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { ImageService } from '../../Services/image.service';

@Component({
  selector: 'app-offre-modi',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule,NgxEditorModule],
  templateUrl: './offre-modi.component.html',
  styleUrl: './offre-modi.component.scss'
})
export class OffreModiComponent implements OnInit {
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
  offre!: FormGroup;  
  categories: any;
  id!: number;
selectedFile: File | null = null;
   imagePreview: string | null = null;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categorieService: CategorieService,
    private offreService: OffreService,
    private toastr: ToastrService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.editor = new Editor();

    this.offre = this.fb.group({
      titre: ['', Validators.required],
      categorieid: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      image: ['']
    });

    this.loadCategories();
    this.loadArticle();
  }
  onCancel(): void {
    this.router.navigate(['/offre']);
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
    this.categorieService.getCategorieByType('OFFRE').subscribe(data => {
      this.categories = data;
    });
  }

  loadArticle(): void {
    this.offreService.getOffreById(this.id).subscribe((data: any) => {
      this.offre.patchValue({
        titre: data.titre,
        categorieid: data.categorie?.id,
        prix: data.prix,
        description: data.description,
        image: data.image
      });
      if (data.image) {
      this.imagePreview =data.image;}
    });
  }
updateOffre(values: any): void {
  this.offreService.updateOffre(this.id, values).subscribe({
    next: () => {
      this.showSuccess('Offre modifiée avec succès');
      this.router.navigate(['/offre']);
    },
    error: () => {
      this.showError("Erreur lors de la modification de l'Offre'");
    }
  });
}
  // onSubmit(): void {
  //   if (this.offre.valid) {
  //     const categorieId = this.offre.value.categorieid;
  //     this.offre.patchValue({ categorieid: { id: categorieId } });

  //     this.offreService.updateOffre(this.id, this.offre.value).subscribe({
  //       next: () => {
  //         this.showSuccess('Offre modifiée avec succès');
  //         this.router.navigate(['/offre']);
  //       },
  //       error: () => {
  //         this.showError("Erreur lors de la modification de l'offre");
  //       }
  //     });
  //   }
  // }
onSubmit(): void {
  if (!this.offre.valid) {
    this.showError("Formulaire invalide !");
    return;
  }

  const values = this.offre.value;
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
        this.updateOffre(values);
      },
      error: () => this.toastr.error("Échec de l'envoi de l'image")
    });

  } else {
    // Cas 2 : aucune nouvelle image → on garde l’image actuelle
    this.updateOffre(values);
  }
}
  showSuccess(message: string): void {
    this.toastr.success(message, 'Succès');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Erreur');
  }
}