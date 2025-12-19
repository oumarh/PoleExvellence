import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { OffreService } from '../../Services/offre.service';
import { FormationService } from '../../Services/formation.service';
import { Observable } from 'rxjs';

interface Card {
  image: string;
  title: string;
  desc: string;
  link?: string;
}
interface Card2 {
  image: string;
  title: string;
  desc: string;
  link?: string;
  prix: string;
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  agriprenariatServices: Card[] = [
    { image: 'images/hero.png', title: 'Titre 1', desc: 'Description...', link: '/services/1' },
    { image: 'assets/agriprenariat2.jpg', title: 'Titre 2', desc: 'Description...', link: '/services/2' },
    { image: 'assets/agriprenariat3.jpg', title: 'Titre 3', desc: 'Description...', link: '/services/3' },
  ];

  conseilServices: Card[] = [
    { image: 'images/hero.png', title: 'Conseil en Stratégie', desc: 'Nous vous accompagnons dans la définition de votre vision et de vos objectifs, en élaborant des plans stratégiques adaptés à vos besoins et à vos ressources.' },
    { image: 'images/woman-868534_1280.jpg', title: 'Conseil en Gestion d’Entreprise', desc: 'Optimisez l’organisation de votre entreprise grâce à nos solutions en management, gestion financière et amélioration des processus internes.' },
    { image: 'images/analyst-6492859_1280.jpg', title: 'Conseil en Transformation Digitale', desc: 'Nous vous aidons à intégrer des outils numériques modernes pour améliorer vos performances, accroître votre visibilité et gagner en compétitivité.' },
    { image: 'images/expert-5442081_1280.jpg', title: 'Conseil en Ressources Humaines', desc: 'Développez vos talents et optimisez vos équipes grâce à nos conseils en recrutement, formation et gestion des compétences.' },
  ];

  // ✅ Offres et formations en tant qu’Observables
  offre$: Observable<any[]>;
  formation$: Observable<any[]>;

  constructor(private offreService: OffreService, private formationService: FormationService) {
    this.offre$ = this.offreService.getOffre();
    this.formation$ = this.formationService.getFormation();
  }
}
