import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../../../services/keycloak/keycloak.service';
import SockJS from 'sockjs-client';
import * as Stompk from 'stompjs';
import { Notification } from './notification';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  username: string | undefined;
  socketClient: any;
  private notificationSubscription: any;
  unreadNotificationCounts = 0;
  notifications: Array<Notification> = [];

  constructor(
    private keycloakService: KeycloakService,
    private toastService: ToastrService 
  ) {}

  ngOnInit(): void {
    this.username = `${this.keycloakService.profile?.firstName} ${this.keycloakService.profile?.lastName}`;

    // Highlight active navigation link
    this.navigationHandler();

    if (this.keycloakService.keycloak.tokenParsed?.sub) {
      let ws = new SockJS('http://localhost:8088/api/v1/');
      this.socketClient = Stompk.over(ws);  
      this.socketClient.connect(
        { 'Authorization:': 'Bearer ' + this.keycloakService.keycloak.token },  
        () => {
          this.notificationSubscription = this.socketClient.subscribe(
            `/user/${this.keycloakService.keycloak.tokenParsed?.sub}/notifications`,
            (message: any) => {
              const notification: Notification = JSON.parse(message.body);
              if (notification) {
                this.notifications.unshift(notification); 
                switch(notification.status){
                  case 'BORROWED': 
                    this.toastService.info(notification.message, notification.bookTitle);
                    break;
                  case 'RETURNED':
                    this.toastService.warning(notification.message, notification.bookTitle);
                    break;
                  case 'RETURN_APPROVED':
                    this.toastService.success(notification.message, notification.bookTitle);
                }
                this.unreadNotificationCounts++;
              }
            }
          )
        }
      );
    }
  }

  private navigationHandler(): void {
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
