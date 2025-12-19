import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environnement } from '../../../environnement/environnement';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  passwordForm: FormGroup;
  message = '';
  token: string | null = null;
  step: 'request' | 'reset' = 'request';

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      if (this.token) {
        this.step = 'reset';
      }
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.http.post(`${environnement.AuthUrl}/forgot-password`, this.resetForm.value)
        .subscribe({
          next: () => this.message = 'Un email de réinitialisation a été envoyé.',
          error: () => this.message = 'Erreur lors de la demande.'
        });
    }
  }

  onResetPassword() {
    if (this.passwordForm.valid && this.token) {
      const { password } = this.passwordForm.value;
      this.http.post(`${environnement.AuthUrl}/reset-password`, { token: this.token, password })
        .subscribe({
          next: () => {
            this.message = 'Mot de passe réinitialisé avec succès. Vous pouvez vous connecter.';
            setTimeout(() => this.router.navigate(['/login']), 2000);
          },
          error: () => this.message = 'Erreur lors de la réinitialisation.'
        });
    }
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
