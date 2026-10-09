import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Alojamientocomponent } from './components/alojamientocomponent/alojamientocomponent';

const routes: Routes = [

  {
    path: '',
    component: Iniciocomponent
  },

  {
    path: 'alojamientos',
    component: Alojamientocomponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
