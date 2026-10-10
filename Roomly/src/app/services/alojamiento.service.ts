import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

interface DatosAlojamientos {
  alojamientos: Alojamiento[];
}

@Injectable({
  providedIn: 'root'
})
export class AlojamientoService {

  private url = 'assets/alojamientos.json';

  constructor(private http: HttpClient) {}

  obtenerAlojamientos(): Observable<DatosAlojamientos> {
    return this.http.get<DatosAlojamientos>(this.url);
  }
}
