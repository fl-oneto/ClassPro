import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authService: AuthService,  //AuthService para verificar autenticación
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      const isAuthenticated = await this.authService.isAuthenticated();

      if (isAuthenticated) {
        this.router.navigate(['/home']);  // Redirige al Home si está autenticado
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
