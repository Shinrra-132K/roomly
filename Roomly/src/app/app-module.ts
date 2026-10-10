
import {
  NgModule,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Iniciocomponent } from './components/iniciocomponent/iniciocomponent';
import { Alojamientocomponent } from './components/alojamientocomponent/alojamientocomponent';
import { Detallecomponent } from './components/detallecomponent/detallecomponent';
import { Datocomponent } from './components/datocomponent/datocomponent';
import { Reservacomponent } from './components/reservacomponent/reservacomponent';

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Footercomponent,
    Iniciocomponent,
    Alojamientocomponent,
    Detallecomponent,
    Datocomponent,
    Reservacomponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule {}
