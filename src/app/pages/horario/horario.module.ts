import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HorarioPageRoutingModule } from './horario-routing.module';
import { HorarioPage } from './horario.page';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioPageRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [HorarioPage]
})
export class HorarioPageModule {}
