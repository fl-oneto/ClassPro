import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-pw',
  templateUrl: './recuperar-pw.page.html',
  styleUrls: ['./recuperar-pw.page.scss'],
})
export class RecuperarPwPage implements OnInit {
  email: string="";
  emailInvalido: boolean = false;

  constructor(public toastController:ToastController) { }

  ngOnInit() {
  }

  validarEmail(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (!this.email || this.email.trim() === '') {
      this.emailInvalido = true; 
    } else {
      this.emailInvalido = !emailPattern.test(this.email);
    }
  }

  enviar() {
    this.validarEmail();
    if (!this.emailInvalido) {
      this.presentToast('bottom', 'Correo enviado con éxito.');
    } else {
      this.presentToast('bottom', 'Debes ingresar un correo válido.', 3000);
    }
  }


  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, duration?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:2500,
      position: position,
    });

    await toast.present();
  } 
}
