import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;


get keycloak() {
  if (!this._keycloak) {
    this._keycloak = new Keycloak({
      url: 'https://8888-2409-4072-6e9e-9971-606c-89f4-5bf2-e17f.ngrok-free.app',
      realm: 'e-books',
      clientId: 'bsn'
    });
  }
  return this._keycloak;
}


  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() {}

  async init(): Promise<boolean> {
    console.log('Authenticating user');
    const authenticated = await this.keycloak.init({
      onLoad: 'login-required'
    });

    if (authenticated) {
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }
    return authenticated;
  }


  login(){
    return this.keycloak?.login();
  }

  logout(){
    return this.keycloak?.logout({redirectUri: 'http://localhost:4200'});
   }


}







