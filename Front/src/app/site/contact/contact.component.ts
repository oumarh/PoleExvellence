import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact = {
    nom: '',
    email: '',
    objet: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

onSubmit() {
  this.http.post('http://localhost:8080/PoleExcellence/Sendmail', this.contact)
    .subscribe({
      next: () => alert('Message envoyé !'),
      error: () => alert('Erreur lors de l\'envoi du message.')
    });
}
}
