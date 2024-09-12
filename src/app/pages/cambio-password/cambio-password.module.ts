import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioPasswordPageRoutingModule } from './cambio-password-routing.module';

import { CambioPasswordPage } from './cambio-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioPasswordPageRoutingModule
  ],
  declarations: [CambioPasswordPage]
})
export class CambioPasswordPageModule {}
