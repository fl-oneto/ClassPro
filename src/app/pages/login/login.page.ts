import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: any = {
    usuario: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {}
  async ingresar() {
    if (this.validateModel(this.login)) {
      const token = 'dummy-token';
      const nombreUsuario = this.login.usuario;

      await this.authService.login(token, nombreUsuario);
      this.presentToast('top', 'Inicio de sesión exitoso', 1500);

      this.router.navigate(['/home']);
    } else {
      this.presentToast('top', 'Por favor, ingresa usuario y contraseña', 1500);
    }
  }

  // Valida el inicio de sesión
  validateModel(model: any) {
    return model.usuario !== '' && model.password !== '';
  }
  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2500,
      position: position,
    });
    await toast.present();
  }
}
