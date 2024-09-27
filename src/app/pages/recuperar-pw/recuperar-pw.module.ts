import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarPwPageRoutingModule } from './recuperar-pw-routing.module';

import { RecuperarPwPage } from './recuperar-pw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarPwPageRoutingModule
  ],
  declarations: [RecuperarPwPage]
})
export class RecuperarPwPageModule {}
