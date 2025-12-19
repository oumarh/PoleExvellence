import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule }                    from '@angular/forms';
import { ActivatedRoute, Router, RouterLink }                     from '@angular/router';
import { Editor, NgxEditorModule, Toolbar, Validators } from 'ngx-editor';
import { CategorieService } from '../../Services/categorie.service';
import { ArticleService } from '../../Services/article.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../Services/image.service';
@Component({
  selector: 'app-blog-ajout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    NgxEditorModule
      // on importe le module Angular du composant <ckeditor>
  ],
  templateUrl: './blog-ajout.component.html',
  styleUrls: ['./blog-ajout.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogAjoutComponent implements OnInit{
  article!: FormGroup;
  data : any
  categories:any
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  selectedFile: File | null = null;
  onCancel(): void {
    window.history.back();
  }
   
      constructor( 
        private route: ActivatedRoute,
        private categorieService: CategorieService,
        private articleService: ArticleService,
        private toastr: ToastrService,
      private formBuilder: FormBuilder,
     private imageService: ImageService,
    private router: Router) 
        {}

        ngOnInit() {
              this.LoadsCategorieByType();
              this.editor = new Editor();
              this.article=this.formBuilder.group({
                titre:['',Validators.required],
                categorieid:['',Validators.required],
                contenu:['',Validators.required],
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
              this.categorieService.getCategorieByType('ARTICLE').subscribe((data:any) => {
               this.categories =data})
               
            }
            
            message: string = '';

            onSubmit(): void {
              if (!this.article.valid) {
                this.showError("Formulaire invalide !");
                return;
              }
            
              const values = this.article.value;
              values.categorieid = { id: values.categorieid };

              // Si une image est sélectionnée, on l'upload d'abord
              if (this.selectedFile) {
                this.imageService.uploadImage(this.selectedFile).subscribe({
                  next: (cheminImage: string) => {
                    values.image = cheminImage;
                    this.articleService.createArticle(values).subscribe({
                      next: () => {
                        this.showSuccess('Article ajouté avec succès');
                        this.ngOnInit();
                        this.router.navigate(['/admin-blog']);
                      },
                      error: () => this.showError("Erreur lors de l'ajout de l'article")
                    });
                  },
                  error: () => this.showError("Échec de l'envoi de l'image, veuillez choisir une image!")
                });
              } else {
                // Pas d'image : on créé directement l'article
                this.articleService.createArticle(values).subscribe({
                  next: () => {
                    this.showSuccess('Article ajouté avec succès');
                    this.ngOnInit();
                    this.router.navigate(['/admin-blog']);
                  },
                  error: () => this.showError("Erreur lors de l'ajout de l'article")
                });
              }
          
            }

  //  onSubmit() {
  //   if(this.article.valid){
  //     var objet: {[id: string]: any}={ };
  //     objet['id']=this.article.value.categorieid;
  //     this.article.value.categorieid= objet;
  //     //this.formation.value.categorie= {id: this.categories.id}
  //     this.articleService.createArticle(this.article.value).subscribe({
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

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
  
}
