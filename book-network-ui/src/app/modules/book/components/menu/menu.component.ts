import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../../../services/keycloak/keycloak.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  username: string | undefined;  // Store the username

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.username = `${this.keycloakService.profile?.firstName} ${this.keycloakService.profile?.lastName}`;

    // Highlight active navigation link
    const linkColour = document.querySelectorAll('.nav-link');
    linkColour.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColour.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout();
  }
}
