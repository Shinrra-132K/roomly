
import { Component, OnInit } from '@angular/core';

interface Reserva {
  id: string;
  alojamientoId: number;
  alojamiento: string;
  ciudad: string;
  imagen: string;
  fechaLlegada: string;
  fechaSalida: string;
  huespedes: number;
  noches: number;
  total: number;
  titular: string;
  correo: string;
  estado: string;
  fechaRegistro: string;
}

@Component({
  selector: 'app-reservacomponent',
  standalone: false,
  templateUrl: './reservacomponent.html',
  styleUrl: './reservacomponent.css'
})
export class Reservacomponent implements OnInit {
  reservas: Reserva[] = [];
  error = '';
  cargando = true;

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    this.cargando = true;
    this.error = '';

    try {
      const almacenadas = localStorage.getItem('roomly_reservas');

      if (!almacenadas) {
        this.reservas = [];
        return;
      }

      const datos: unknown = JSON.parse(almacenadas);

      if (!Array.isArray(datos)) {
        throw new Error(
          'El contenido almacenado no es una lista de reservas.'
        );
      }

      this.reservas = (datos as Reserva[])
        .filter((reserva) =>
          reserva && typeof reserva === 'object'
        )
        .reverse();

    } catch (e) {
      console.error('No se pudieron leer las reservas:', e);

      this.reservas = [];
      this.error =
        'No fue posible leer las reservas guardadas en este navegador.';

    } finally {
      this.cargando = false;
    }
  }

  formatearPrecio(valor: number): string {
    return Number(valor || 0).toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    });
  }

  formatearFecha(fecha: string): string {
    if (!fecha) {
      return 'No disponible';
    }

    const partes = fecha.split('-').map(Number);

    if (
      partes.length !== 3 ||
      partes.some(Number.isNaN)
    ) {
      return fecha;
    }

    const fechaLocal = new Date(
      partes[0],
      partes[1] - 1,
      partes[2]
    );

    return fechaLocal.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  estadoClase(estado: string): string {
    const normalizado = (estado || '').toLowerCase();

    if (normalizado.includes('cancel')) {
      return 'estado-cancelada';
    }

    if (normalizado.includes('pend')) {
      return 'estado-pendiente';
    }

    return 'estado-confirmada';
  }

  trackByReserva(
    _index: number,
    reserva: Reserva
  ): string {
    return reserva.id;
  }
}
