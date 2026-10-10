import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface Alojamiento {
  id: number;
  nombre: string;
  ciudad: string;
  departamento: string;
  tipo: string;
  huespedes: number;
  precio: number;
  imagen: string;
  descripcion: string;
  servicios: string[];
  calificacion: number;
  activo: boolean;
  ubicacion: string;
  habitaciones: number;
  camas: number;
  banos: number;
  tarifaLimpieza: number;
  reglas: string[];
  imagenes?: string[];
}

export interface Resena {
  id: number;
  alojamientoId: number;
  usuario: string;
  calificacion: number;
  comentario: string;
}

export interface DatosAlojamientos {
  alojamientos: Alojamiento[];
  resenas?: Resena[];
}

@Injectable({
  providedIn: 'root'
})
export class AlojamientoService {

  private url = 'assets/alojamientos.json';

  private datos$?: Observable<DatosAlojamientos>;

  constructor(private http: HttpClient) {}

  obtenerAlojamientos(): Observable<DatosAlojamientos> {
    if (!this.datos$) {
      this.datos$ = this.http
        .get<DatosAlojamientos>(this.url)
        .pipe(shareReplay(1));
    }
    return this.datos$;
  }
}
