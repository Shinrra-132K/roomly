import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Alojamiento, AlojamientoService } from '../../services/alojamiento.service';

@Component({
  selector: 'app-alojamientocomponent',
  templateUrl: './alojamientocomponent.html',
  styleUrls: ['./alojamientocomponent.css'],
  standalone: false
})
export class Alojamientocomponent implements OnInit {
  ciudadSeleccionada: string = '';
  tipoAlojamiento: string = '';

  precioMinimo: number | null = null;
  precioMaximo: number | null = null;
  numeroHuespedes: number | null = null;

  alojamientos: Alojamiento[] = [];
  cargando: boolean = true;
  errorCarga: boolean = false;

  ciudades: string[] = [];
  tipos: string[] = [];

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
          console.log('Datos recibidos:', datos);

          this.alojamientos = datos.alojamientos.filter(
            alojamiento => alojamiento.activo
          );

          this.ciudades = [
            ...new Set(
              this.alojamientos.map(a => a.ciudad)
            )
          ].sort();

          this.tipos = [
            ...new Set(
              this.alojamientos.map(a => a.tipo)
            )
          ].sort();

          this.cargando = false;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(
            'Error al cargar los alojamientos:',
            error
          );

          this.errorCarga = true;
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
  }

  get alojamientosFiltrados(): Alojamiento[] {
    return this.alojamientos.filter((alojamiento) => {

      const coincideCiudad =
        this.ciudadSeleccionada === '' ||
        alojamiento.ciudad === this.ciudadSeleccionada;

      const coincideTipo =
        this.tipoAlojamiento === '' ||
        alojamiento.tipo === this.tipoAlojamiento;

      const coincideHuespedes =
        this.numeroHuespedes === null ||
        this.numeroHuespedes === 0 ||
        alojamiento.huespedes >= this.numeroHuespedes;

      const coincidePrecioMinimo =
        this.precioMinimo === null ||
        alojamiento.precio >= this.precioMinimo;

      const coincidePrecioMaximo =
        this.precioMaximo === null ||
        this.precioMaximo === 0 ||
        alojamiento.precio <= this.precioMaximo;

      return (
        coincideCiudad &&
        coincideTipo &&
        coincideHuespedes &&
        coincidePrecioMinimo &&
        coincidePrecioMaximo
      );
    });
  }

  limpiarFiltros(): void {
    this.ciudadSeleccionada = '';
    this.tipoAlojamiento = '';
    this.numeroHuespedes = null;
    this.precioMinimo = null;
    this.precioMaximo = null;
  }

  formatearPrecio(precio: number): string {
    return precio.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    });
  }
}
