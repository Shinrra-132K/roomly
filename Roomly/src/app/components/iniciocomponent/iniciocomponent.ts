import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Alojamiento, AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-iniciocomponent',
  standalone: false,
  styleUrl: './iniciocomponent.css',
  templateUrl: './iniciocomponent.html',
})
export class Iniciocomponent implements OnInit {
  destacados: Alojamiento[] = [];
  cargando: boolean = true;
  errorCarga: boolean = false;

  constructor(
    private alojamientoService: AlojamientoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarAlojamientos();
  }

  cargarAlojamientos(): void {
    this.cargando = true;
    this.errorCarga = false;

    this.alojamientoService
      .obtenerAlojamientos()
      .subscribe({
        next: (datos) => {
          this.destacados = datos.alojamientos
            .filter(alojamiento => alojamiento.activo)
            .sort((a, b) => b.calificacion - a.calificacion)
            .slice(0, 3);

          this.cargando = false;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error('Error al cargar los alojamientos destacados:', error);

          this.errorCarga = true;
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
  }

  formatearPrecio(precio: number): string {
    return precio.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    });
  }

  formatearCalificacion(calificacion: number): string {
    return calificacion.toLocaleString('es-CO', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });
  }
}
