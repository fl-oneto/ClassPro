import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.page.html',
  styleUrls: ['./cambio-password.page.scss'],
})
export class CambioPasswordPage implements OnInit {
  //modelo  nuevo login que permita obtener la info. de usuario, password1 y password2
  nuevo_login:any={
    usuario:"",
    password1:"",
    password2:""
  }
  field:string="";
  constructor(public router: Router, public toastController:ToastController) { }

  ngOnInit() {
  }

  guardarCambios() {
    if (this.validateModel(this.nuevo_login)) {
      let navigationExtras: NavigationExtras = {
        state: { nuevo_login: this.nuevo_login }
      };
      this.router.navigate(['/login'], navigationExtras);
      this.presentToast("bottom", "Contraseña Actualizada con Éxito", 1500);
    }
  }

  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      const stringValue = value as string;
  
      if (key === 'password1' || key === 'password2') {
        if (stringValue === "") {
          this.presentToast("middle", "El campo " + key + " no puede estar vacío.");
          return false;
        } else if (stringValue.length < 8) {
          this.presentToast("middle", "La contraseña debe tener al menos 8 caracteres.");
          return false;
        }
      } else if (stringValue === "") {
        this.presentToast("middle", "El campo " + key + " no puede estar vacío.");
        return false;
      }
  
      if (this.nuevo_login.password1 && this.nuevo_login.password2 && this.nuevo_login.password1 !== this.nuevo_login.password2) {
        this.presentToast("middle", "Las contraseñas deben coincidir.");
        return false;
      }
    }
    return true;
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
