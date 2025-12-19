import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { CategorieService } from '../../Services/categorie.service';
import { ArticleService } from '../../Services/article.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../Services/image.service';

@Component({
  selector: 'app-blog-modif',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule],
  templateUrl: './blog-modi.component.html',
  styleUrls: ['./blog-modi.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogModiComponent implements OnInit {
  article!: FormGroup;
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
  categories: any;
  id!: number;
   selectedFile: File | null = null;
   imagePreview: string | null = null;
  onCancel(): void {
    window.history.back();
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categorieService: CategorieService,
    private articleService: ArticleService,
    private toastr: ToastrService,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.editor = new Editor();

    this.article = this.fb.group({
      titre: ['', Validators.required],
      categorieid: ['', Validators.required],
      datedepubli: [''],
      contenu: ['', Validators.required],
      image: ['']
    });

    this.loadCategories();
    this.loadArticle();
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
    this.categorieService.getCategorieByType('ARTICLE').subscribe(data => {
      this.categories = data;
    });
  }

  loadArticle(): void {
    this.articleService.getArticleById(this.id).subscribe((data: any) => {
      this.article.patchValue({
        titre: data.titre,
        categorieid: data.categorie?.id,
        datedepubli: data.datedepubli,
        contenu: data.contenu,
        image: data.image
      });
      if (data.image) {
      this.imagePreview =data.image;}
    });
  }
  updateArticle(values: any): void {
  this.articleService.updateArticle(this.id, values).subscribe({
    next: () => {
      this.showSuccess('Offre modifiée avec succès');
      this.router.navigate(['/admin-blog']);
    },
    error: () => {
      this.showError("Erreur lors de la modification de l'Offre'");
    }
  });
}
  // onSubmit(): void {
  //   if (this.article.valid) {
  //     const categorieId = this.article.value.categorieid;
  //     this.article.patchValue({ categorieid: { id: categorieId } });

  //     this.articleService.updateArticle(this.id, this.article.value).subscribe({
  //       next: () => {
  //         this.showSuccess('Article modifié avec succès');
  //         this.router.navigate(['/admin-blog']);
  //       },
  //       error: () => {
  //         this.showError("Erreur lors de la modification de l'article");
  //       }
  //     });
  //   }
  // }
onSubmit(): void {
  if (!this.article.valid) {
    this.showError("Formulaire invalide !");
    return;
  }

  const values = this.article.value;
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
        this.updateArticle(values);
      },
      error: () => this.toastr.error("Échec de l'envoi de l'image")
    });

  } else {
    // Cas 2 : aucune nouvelle image → on garde l’image actuelle
    this.updateArticle(values);
  }
}
  showSuccess(message: string): void {
    this.toastr.success(message, 'Succès');
  }

  showError(message: string): void {
    this.toastr.error(message, 'Erreur');
  }
}
// offre!: FormGroup;
  // categories: any;
  // offreId!: number;

  // constructor(
  //   private fb: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private offreService: OffreService,
  //   private categorieService: CategorieService,
  //   private toastr: ToastrService
  // ) {}

  // ngOnInit(): void {
  //   this.offreId = +this.route.snapshot.paramMap.get('id')!;
  //   this.offre = this.fb.group({
  //     titre: ['', Validators.required],
  //     categorieid: ['', Validators.required],
  //     Datedebut: [''],
  //     description: ['', Validators.required],
  //     image: ['']
  //   });
  //   this.loadCategories();
  //   this.loadOffre();
  // }

  

  // loadCategories(): void {
  //   this.categorieService.getCategorieByType('OFFRE').subscribe((data: any) => {
  //     this.categories = data;
  //   });
  // }

  // loadOffre(): void {
  //   this.offreService.getOffreById(this.offreId).subscribe((data: any) => {
  //     this.offre.patchValue({
  //       titre: data.titre,
  //       categorieid: data?.categorie?.id,
  //       Datedebut: data.Datedebut,
  //       description: data.description,
  //       image: data.image
  //     });
  //   });
  // }

  // onSubmit(): void {
  //   if (this.offre.valid) {
  //     const values = this.offre.value.categorieid;
  //     this.offre.patchValue({ categorieid: { id: values } });
  //     this.offreService.updateOffre(this.offreId, this.offre.value).subscribe({
  //       next: () => {
  //         this.toastr.success('Offre modifiée avec succès !', 'Success');
  //         this.router.navigate(['/admin-offre']);
  //       },
  //       error: () => {
  //         this.toastr.error("Erreur lors de la modification de l'offre", 'Erreur');
  //       }
  //     });
  //   }
  // }