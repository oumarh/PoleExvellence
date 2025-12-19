import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild,} from '@angular/core';
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}
@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './a-propos.component.html',
  styleUrl: './a-propos.component.scss'
})
export class AProposComponent {
  @ViewChild('teamContainer', { static: true }) teamContainer!: ElementRef<HTMLDivElement>;

  // Vos données (remplacez par vos vraies images/textes)
  teamMembers: TeamMember[] = [
    {
      name: 'Amadou Diallo',
      role: 'Directeur Commercial',
      image: 'images/Homme.png',
      bio: 'Avec plus de 10 ans d’expérience en gestion commerciale, Amadou pilote la stratégie de développement et veille à la satisfaction des clients et partenaires.'
    },
    {
      name: 'Fatoumata Koné',
      role: 'Responsable Formation',
      image: 'images/Femme.png',
      bio: 'Spécialiste en ingénierie pédagogique, Fatoumata conçoit et supervise les programmes de formation pour garantir une transmission efficace des compétences'
    },
    {
      name: 'Moussa Traoré',
      role: 'Consultant en Stratégie',
      image: 'images/Homme.png',
      bio: 'Moussa accompagne les entreprises dans l’élaboration de plans stratégiques et le déploiement de solutions innovantes pour améliorer leur performance'
    },
    {
      name: 'Awa Coulibaly',
      role: 'Chargée de Communication',
      image: 'images/Femme.png',
      bio: 'Experte en communication digitale, Awa valorise l’image du centre, développe la visibilité sur les réseaux sociaux et coordonne les campagnes de sensibilisation.'
    },
    // …
  ];
  // Par défaut, aucun membre sélectionné
  selectedMember: TeamMember | null = null;

  selectMember(member: TeamMember) {
    console.log('Sélection de', member);
    this.selectedMember = member;
  }

  closeDetail() {
    this.selectedMember = null;
  }
}
