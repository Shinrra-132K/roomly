
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Alojamientocomponent } from './components/alojamientocomponent/alojamientocomponent';
import { Detallecomponent } from './components/detallecomponent/detallecomponent';
import { Datocomponent } from './components/datocomponent/datocomponent';
import { Reservacomponent } from './components/reservacomponent/reservacomponent';

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
    path: 'reserva',
    component: Datocomponent
  },
  {
    path: 'reservas',
    component: Reservacomponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
