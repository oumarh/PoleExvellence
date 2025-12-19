import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-administrateur-ajout',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './administrateur-ajout.component.html',
  styleUrl: './administrateur-ajout.component.scss'
})
export class AdministrateurAjoutComponent {


data : any
 
 admin!: FormGroup
  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onCancel(): void {
    window.history.back();
  }
  
  ngOnInit() {
    this.admin=this.formBuilder.group({
      firstname:['',Validators.required],
      lastmane:['',Validators.required],
      email:['',Validators.required],
      telephone:['',Validators.required],
      password:['',Validators.required],
      poste:['',Validators.required],
      role:['ADMIN', Validators.required] // Ajout du champ rôle, valeur par défaut ADMIN
    })
  }
 message: string = '';
 onSubmit() {
  if(this.admin.valid){
    this.authService.register(this.admin.value).subscribe({
    next: () => {
      this.showSuccess('Compte administrateur créé avec succès !');
      this.admin.reset({ role: 'ADMIN' }); // reset avec rôle par défaut
      this.router.navigate(['/administrateur']);
    },
    error: (err) => {
      this.showError("Erreur lors de la création du compte administrateur");
    },
  });}
}

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
