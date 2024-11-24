import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  nombreUsuario: string = 'Bienvenido';
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,  
    private toastController: ToastController  
  ) { }

  async ngOnInit() {
    this.authService.authenticationState.subscribe(async (state) => {
      this.isAuthenticated = state;  // Actualiza el estado en tiempo real de autenticación
      if (this.isAuthenticated) {
        // Si está autenticado, obtiene el nombre del usuario desde el login
        this.nombreUsuario = (await this.authService.getNombreUsuario()) || 'Usuario';
      } else {
        // Si no está autenticado, muestra "Bienvenido"
        this.nombreUsuario = 'Bienvenido';
      }
    });
  }
  navigateTo(route: string) {
    if (this.isAuthenticated) {
      this.router.navigate([`/${route}`]);  // Permite la navegación si está autenticado
    } else {
      this.presentToast('top', 'Debes iniciar sesión para acceder a esta opción', 2000);
    }
  }

  // Método para logout/login
  async handleAuthButton() {
    if (this.isAuthenticated) {
      this.logoutConfirm();  // Si está autenticado, cierra sesión
    } else {
      this.router.navigate(['/login']);  // Redirige al login si no está autenticado
      this.presentToast('top', 'Por favor, inicia sesión para continuar', 2000);
    }
  }
  async logoutConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, cerrar sesión',
          handler: async () => {
            await this.authService.logout();  
            this.isAuthenticated = false;  
            this.presentToast('top', 'Sesión cerrada correctamente', 1500);
            this.router.navigate(['/login']);  // Redirige al login
          }
        }
      ]
    });
    await alert.present();
  }
  async presentToast(position: 'top', msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2500,
      position: position,
    });
    await toast.present();
  }
  async shareApp() {
    try {
      await Share.share({
        title: 'Descubre la app ClassPro',
        text: '¡Hola! Te recomiendo que pruebes la app ClassPro. Está diseñada para ayudarte a gestionar tu horario, notas, y más.',
        url: 'https://example.com', // URL de la app en la Play Store o App Store
        dialogTitle: 'Compartir la app ClassPro',
      });
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  }
}
