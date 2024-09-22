import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //modelo login que permita obtener la info. de usuario y password
  login:any={
    usuario:"",
    password:""
  }
  //variable para obtener el nombre del campo vacío
  field:string="";
  constructor(public router: Router,public toastController:ToastController) { }

  ngOnInit() {
  }

  ingresar() {
    if (this.validateModel(this.login)) {
      // Si el modelo es válido, navegar a la página de inicio
      let navigationExtras: NavigationExtras = {
        state: { login: this.login }
      };
      this.router.navigate(['/home'], navigationExtras);
      this.presentToast("bottom", "Bienvenido", 1500);
    }
  }
  
  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      const stringValue = value as string;
  
      if (key === 'password') {
        if (stringValue === "") {
          this.presentToast("middle", "El campo password no puede estar vacío.");
          return false;
        } else if (stringValue.length < 8) {
          this.presentToast("middle", "La contraseña debe tener al menos 8 caracteres.");
          return false;
        }
      } else if (stringValue === "") {
        this.presentToast("middle", "El campo " + key + " no puede estar vacío.");
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

