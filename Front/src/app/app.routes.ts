import { Routes } from '@angular/router';
import { AcceuilComponent } from './site/acceuil/acceuil.component';
import { HeaderComponent } from './site/header/header.component';
import { ServiceComponent } from './site/service/service.component';
import { EntrepreunariatComponent } from './site/entrepreunariat/entrepreunariat.component';
import { EntrepreunariatDetailComponent } from './site/entrepreunariat-detail/entrepreunariat-detail.component';
import { FormationComponent } from './site/formation/formation.component';
import { FormationDetailComponent } from './site/formation-detail/formation-detail.component';
import { ContactComponent } from './site/contact/contact.component';
import { AProposComponent } from './site/a-propos/a-propos.component';
import { BlogDetailsComponent } from './site/blog-details/blog-details.component';
import { LoginComponent } from './admin/login/login.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdministrateurComponent } from './admin/administrateur/administrateur.component';
import { AdministrateurAjoutComponent } from './admin/administrateur-ajout/administrateur-ajout.component';
import { BlogAComponent } from './admin/blog/blog.component';
import { BlogAjoutComponent } from './admin/blog-ajout/blog-ajout.component';
import { BlogADetailsComponent } from './admin/blog-details/blog-details.component';
import { EntrepreneurComponent } from './admin/entrepreneur/entrepreneur.component';
import { EntrepreneurDetailsComponent } from './admin/entrepreneur-details/entrepreneur-details.component';
import { CandidatsComponent } from './admin/candidats/candidats.component';
import { CandidatDetailsComponent } from './admin/candidat-details/candidat-details.component';
import { CategorieComponent } from './admin/categorie/categorie.component';
import { CategorieAjoutComponent } from './admin/categorie-ajout/categorie-ajout.component';
import { EntrepreneurAjoutComponent } from './admin/entrepreneur-ajout/entrepreneur-ajout.component';
import { CandidatAjoutComponent } from './admin/candidat-ajout/candidat-ajout.component';
import { FormationAComponent } from './admin/formation/formation.component';
import { FormationAjoutComponent } from './admin/formation-ajout/formation-ajout.component';
import { FormationADetailsComponent } from './admin/formation-details/formation-details.component';
import { OffreComponent } from './admin/offre/offre.component';
import { OffreAjoutComponent } from './admin/offre-ajout/offre-ajout.component';
import { OffreDetailsComponent } from './admin/offre-details/offre-details.component';
import { BlogComponent } from './site/blog/blog.component';
import { OffreModiComponent } from './admin/offre-modi/offre-modi.component';
import { FormationModiComponent } from './admin/formation-modi/formation-modi.component';
import { CategorieModiComponent } from './admin/categorie-modi/categorie-modi.component';
import { BlogModiComponent } from './admin/blog-modi/blog-modi.component';
import { authGuard } from './guards/authguard.guard';
// import { authGuard } from './guards/authguard.guard';


export const routes: Routes = [
    // Routes pour le front-office
    { path: '', component: AcceuilComponent },
    { path: 'service', component: ServiceComponent },
    { path: 'acceuil', component: AcceuilComponent },
    { path: 'entrepreunariat', component: EntrepreunariatComponent },
    { path: 'entrepreunariat-details/:id', component: EntrepreunariatDetailComponent },
    { path: 'formation', component: FormationComponent },
    { path: 'formation-details/:id', component: FormationDetailComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'a-propos', component: AProposComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'acceuil', component: AcceuilComponent },
    { path: 'blog-details/:id', component:BlogDetailsComponent },
    
    // Routes pour le back-office
    { path: 'login', component:LoginComponent },
    { path: 'reset-password', component:ResetPasswordComponent },
    { path: 'dashboard', component:DashboardComponent,  canActivate: [authGuard] },
    { path: 'administrateur', component:AdministrateurComponent, canActivate: [authGuard] },
    { path: 'administrateur-ajout', component:AdministrateurAjoutComponent, canActivate: [authGuard] },
    { path: 'admin-blog', component:BlogAComponent, canActivate: [authGuard] },
    { path: 'admin-blog-ajout', component:BlogAjoutComponent, canActivate: [authGuard] },
    { path: 'admin-blog-details/:id', component:BlogADetailsComponent, canActivate: [authGuard] },
    { path: 'admin-blog-modi/:id', component:BlogModiComponent, canActivate: [authGuard] },
    { path: 'entrepreneur', component:EntrepreneurComponent, canActivate: [authGuard] },
    { path: 'entrepreneur-ajout', component:EntrepreneurAjoutComponent, canActivate: [authGuard] },
    { path: 'entrepreneur-details/:id', component:EntrepreneurDetailsComponent, canActivate: [authGuard] },
    { path: 'candidat', component:CandidatsComponent, canActivate: [authGuard] },
    { path: 'candidat-details/:id', component:CandidatDetailsComponent, canActivate: [authGuard] },
    { path: 'candidat-ajout', component:CandidatAjoutComponent, canActivate: [authGuard] },
    { path: 'categorie', component:CategorieComponent, canActivate: [authGuard] },
    { path: 'categorie-ajout', component:CategorieAjoutComponent, canActivate: [authGuard] },
    { path: 'categorie-modi/:id', component:CategorieModiComponent, canActivate: [authGuard] },
    { path: 'admin-formation', component:FormationAComponent, canActivate: [authGuard] },
    { path: 'formation-ajout', component:FormationAjoutComponent, canActivate: [authGuard] },
    { path: 'admin-formation-details/:id', component:FormationADetailsComponent, canActivate: [authGuard] },
    { path: 'admin-formation-modi/:id', component:FormationModiComponent, canActivate: [authGuard] },
    { path: 'offre', component:OffreComponent, canActivate: [authGuard] },
    { path: 'offre-ajout', component:OffreAjoutComponent, canActivate: [authGuard] },
    { path: 'offre-details/:id', component:OffreDetailsComponent, canActivate: [authGuard] },
    { path: 'offre-modi/:id', component:OffreModiComponent, canActivate: [authGuard] },
];
