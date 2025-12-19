import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public router: Router, public authService: AuthService) {}

  goToAdmin() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  isBackoffice(): boolean {
    // Liste des préfixes de routes du backoffice
    const backofficePrefixes = [
      '/dashboard', '/administrateur', '/administrateur-ajout', '/admin-blog', '/admin-blog-ajout', '/admin-blog-details', '/admin-blog-modi',
      '/entrepreneur', '/entrepreneur-ajout', '/entrepreneur-details', '/candidat', '/candidat-details', '/candidat-ajout',
      '/categorie', '/categorie-ajout', '/categorie-modi', '/admin-formation', '/formation-ajout', '/admin-formation-details', '/admin-formation-modi',
      '/offre', '/offre-ajout', '/offre-details', '/offre-modi','/login'
    ];
    return backofficePrefixes.some(prefix => this.router.url.startsWith(prefix));
  }
}
