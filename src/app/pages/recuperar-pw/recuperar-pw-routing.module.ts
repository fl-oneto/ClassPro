import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarPwPage } from './recuperar-pw.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarPwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPwPageRoutingModule {}
