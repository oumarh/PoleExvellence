import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategorieService } from '../../Services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { Validators } from 'ngx-editor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorie-modi',
  standalone: true,
  imports: [CommonModule,
      ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './categorie-modi.component.html',
  styleUrl: './categorie-modi.component.scss'
})
export class CategorieModiComponent implements OnInit {
  
    categorieId!: number;
    categorie!: FormGroup;
  
    constructor(
      private route: ActivatedRoute,
      private categorieService: CategorieService,
      private toastr: ToastrService,
      private formBuilder: FormBuilder,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.categorieId = this.route.snapshot.params['id'];
  
      this.categorie = this.formBuilder.group({
        nom: ['', Validators.required],
        type: ['', Validators.required]
      });
  
      this.loadCategorie();
    }
  
    loadCategorie(): void {
      this.categorieService.getCategorieById(this.categorieId).subscribe((data: any) => {
        this.categorie.patchValue({
          nom: data.nom,
          type: data.type
        });
      });
    }
  
    onCancel(): void {
      this.router.navigate(['/categorie']);
    }

    onSubmit(): void {
      if (this.categorie.valid) {
        this.categorieService.updateCategorie(this.categorieId, this.categorie.value).subscribe({
          next: () => {
            this.showSuccess('Catégorie modifiée avec succès');
            this.router.navigate(['/categorie']);
          },
          error: () => {
            this.showError("Erreur lors de la modification de la catégorie");
          }
        });
      }
    }
  
    showSuccess(message: string): void {
      this.toastr.success(message, 'Succès');
    }
  
    showError(message: string): void {
      this.toastr.error(message, 'Erreur');
    }

    logout() {
      localStorage.removeItem('auth-token');
      this.router.navigate(['/login']);
    }
}
