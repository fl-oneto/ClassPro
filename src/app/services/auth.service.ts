import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  public authenticationState = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
    this.init();  // Inicializa almacenamiento
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.checkToken();  // Comprueba si hay un token almacenado
  }

  // Verifica si el token existe
  async checkToken() {
    const token = await this._storage?.get('auth_token');
    if (token) {
      this.authenticationState.next(true);  // Si hay token, el usuario esta autenticado
    } else {
      this.authenticationState.next(false);
    }
  }

  // Guarda el token y el nombre del usuario
  async login(token: string, nombreUsuario: string): Promise<void> {
    await this._storage?.set('auth_token', token);  // Guarda el token y nombre de usuario
    await this._storage?.set('nombre_usuario', nombreUsuario);
    this.authenticationState.next(true);  // Actualiza el estado de autenticación
  }
  async getNombreUsuario(): Promise<string | null> {
    return await this._storage?.get('nombre_usuario');  // Retorna el nombre de usuario almacenado
  }
  isAuthenticated(): boolean {
    return this.authenticationState.value;  // Retorna el estado de autenticación actual
  }

  // Elimina el token y el nombre de usuario al cerrar sesion
  async logout(): Promise<void> {
    await this._storage?.remove('auth_token');  // Elimina el token
    await this._storage?.remove('nombre_usuario');
    this.authenticationState.next(false);
  }
}
