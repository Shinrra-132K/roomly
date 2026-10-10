
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Alojamiento,
  AlojamientoService,
  Resena
} from '../../services/alojamiento.service';

@Component({
  selector: 'app-detallecomponent',
  standalone: false,
  styleUrl: './detallecomponent.css',
  templateUrl: './detallecomponent.html',
})
export class Detallecomponent implements OnInit {

  alojamiento?: Alojamiento;
  resenas: Resena[] = [];
  similares: Alojamiento[] = [];

  fotos: string[] = [];
  servicios: string[] = [];
  serviciosAnillo: string[] = [];

  cargando: boolean = true;
  errorCarga: boolean = false;

  llegada: string = '';
  noches: number = 1;
  numHuespedes: number = 1;
  hoy: string = this.fechaLocal(new Date());

  constructor(
    private route: ActivatedRoute,
    private alojamientoService: AlojamientoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.cargar(Number(params.get('id')));
    });
  }

  cargar(id: number): void {
    this.cargando = true;
    this.errorCarga = false;
    window.scrollTo(0, 0);

    this.alojamientoService.obtenerAlojamientos().subscribe({
      next: (datos) => {
        const activos = datos.alojamientos.filter((a) => a.activo);
        const seleccionado = activos.find((a) => a.id === id);

        this.alojamiento = seleccionado;

        this.resenas = (datos.resenas ?? [])
          .filter((r) => r.alojamientoId === id);

        if (seleccionado) {
          this.fotos =
            seleccionado.imagenes &&
            seleccionado.imagenes.length > 0
              ? seleccionado.imagenes
              : [seleccionado.imagen];

          this.servicios = seleccionado.servicios ?? [];
          this.serviciosAnillo = [
            ...this.servicios,
            ...this.servicios
          ];

          const otros = activos.filter((a) => a.id !== id);

          this.similares = [
            ...otros.filter((a) => a.tipo === seleccionado.tipo),
            ...otros.filter((a) => a.tipo !== seleccionado.tipo)
          ].slice(0, 3);

          this.llegada = '';
          this.noches = 1;
          this.numHuespedes = 1;
        }

        this.cargando = false;
      },

      error: () => {
        this.errorCarga = true;
        this.cargando = false;
      }
    });
  }

  get subtotal(): number {
    return this.noches * (this.alojamiento?.precio ?? 0);
  }

  get tarifaLimpieza(): number {
    return this.alojamiento?.tarifaLimpieza ?? 0;
  }

  get tarifaServicio(): number {
    return this.subtotal * 0.1;
  }

  get total(): number {
    return this.subtotal +
      this.tarifaLimpieza +
      this.tarifaServicio;
  }

  get errorFecha(): string {
    if (this.llegada && this.llegada < this.hoy) {
      return 'La fecha de llegada no puede ser anterior a hoy.';
    }

    return '';
  }

  get fechaSalida(): string {
    if (!this.llegada || this.errorFecha) {
      return '';
    }

    const [anio, mes, dia] = this.llegada
      .split('-')
      .map(Number);

    const salida = new Date(
      anio,
      mes - 1,
      dia + this.noches
    );

    return salida.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  get fechaSalidaISO(): string {
    if (!this.llegada || this.errorFecha) {
      return '';
    }

    const [anio, mes, dia] = this.llegada
      .split('-')
      .map(Number);

    const salida = new Date(
      anio,
      mes - 1,
      dia + this.noches
    );

    const mesSalida = String(
      salida.getMonth() + 1
    ).padStart(2, '0');

    const diaSalida = String(
      salida.getDate()
    ).padStart(2, '0');

    return `${salida.getFullYear()}-${mesSalida}-${diaSalida}`;
  }

  irAReserva(): void {
    if (!this.alojamiento) {
      return;
    }

    if (!this.llegada || this.errorFecha) {
      alert('Selecciona una fecha de llegada válida.');
      return;
    }

    if (
      this.noches < 1 ||
      this.numHuespedes < 1 ||
      this.numHuespedes > this.alojamiento.huespedes
    ) {
      alert('Verifica las noches y el número de huéspedes.');
      return;
    }

    this.router.navigate(['/reserva'], {
      queryParams: {
        alojamientoId: this.alojamiento.id,
        alojamiento: this.alojamiento.nombre,
        ciudad: this.alojamiento.ciudad,
        imagen: this.alojamiento.imagen,
        llegada: this.llegada,
        salida: this.fechaSalidaISO,
        noches: this.noches,
        huespedes: this.numHuespedes,
        total: this.total
      }
    });
  }

  cambiarNoches(cambio: number): void {
    this.noches = Math.max(1, this.noches + cambio);
  }

  cambiarHuespedes(cambio: number): void {
    const maximo = this.alojamiento?.huespedes ?? 1;

    this.numHuespedes = Math.min(
      maximo,
      Math.max(1, this.numHuespedes + cambio)
    );
  }

  formatearPrecio(precio: number): string {
    return precio.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    });
  }

  estrellasLlenas(calificacion: number): string {
    return '★'.repeat(Math.round(calificacion));
  }

  estrellasVacias(calificacion: number): string {
    return '★'.repeat(5 - Math.round(calificacion));
  }

  private iconos: { [servicio: string]: string } = {
    'Wi-Fi': 'wifi',
    'Cocina': 'cocina',
    'Televisión': 'tv',
    'Lavadora': 'lavadora',
    'Piscina': 'piscina',
    'Aire acondicionado': 'aire',
    'Parqueadero': 'parqueadero',
    'BBQ': 'fuego',
    'Chimenea': 'fuego',
    'Gimnasio': 'gimnasio'
  };

  iconoServicio(nombre: string): string {
    const n = nombre.toLowerCase();

    if (n.startsWith('wi')) return 'wifi';
    if (n.includes('cocina')) return 'cocina';
    if (n.includes('televisi') || n === 'tv') return 'tv';
    if (n.includes('lavadora')) return 'lavadora';
    if (n.includes('piscina')) return 'piscina';
    if (n.includes('aire')) return 'aire';
    if (n.includes('parqueadero')) return 'parqueadero';
    if (n.includes('bbq') || n.includes('chimenea')) return 'fuego';
    if (n.includes('gimnasio')) return 'gimnasio';

    return 'otro';
  }

  private fechaLocal(fecha: Date): string {
    const mes = String(
      fecha.getMonth() + 1
    ).padStart(2, '0');

    const dia = String(
      fecha.getDate()
    ).padStart(2, '0');

    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }
}
