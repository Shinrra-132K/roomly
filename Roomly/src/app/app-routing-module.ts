import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Alojamientocomponent } from './components/alojamientocomponent/alojamientocomponent';
import {Detallecomponent} from './components/detallecomponent/detallecomponent';


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
    path: 'detalle/:id',
    component: Detallecomponent
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
