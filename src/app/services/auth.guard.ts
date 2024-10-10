import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      return true;  // Usuario autenticado, permite acceso
    } else {
      this.router.navigate(['/login']);  // Si no está autenticado, redirige al login
      return false;
    }
  }
}
