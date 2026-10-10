
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface DatosReserva {
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
  selector: 'app-datocomponent',
  standalone: false,
  templateUrl: './datocomponent.html',
  styleUrl: './datocomponent.css'
})
export class Datocomponent implements OnInit {

  titular: string = '';
  correo: string = '';

  alojamientoId: number = 0;
  alojamiento: string = '';
  ciudad: string = '';
  imagen: string = '';

  fechaLlegada: string = '';
  fechaSalida: string = '';
  huespedes: number = 1;
  noches: number = 1;
  total: number = 0;

  error: string = '';
  mensajeExito: string = '';
  datosValidos: boolean = false;
  reservaGuardada: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.alojamientoId = Number(params.get('alojamientoId'));
      this.alojamiento = params.get('alojamiento') ?? '';
      this.ciudad = params.get('ciudad') ?? '';
      this.imagen = params.get('imagen') ?? '';

      this.fechaLlegada = params.get('llegada') ?? '';
      this.fechaSalida = params.get('salida') ?? '';

      this.huespedes = Number(params.get('huespedes')) || 1;
      this.noches = Number(params.get('noches')) || 1;
      this.total = Number(params.get('total')) || 0;

      this.datosValidos =
        this.alojamientoId > 0 &&
        this.alojamiento.trim().length > 0 &&
        this.fechaLlegada !== '' &&
        this.fechaSalida !== '' &&
        this.fechaLlegada < this.fechaSalida &&
        this.fechaLlegada >= this.fechaLocal(new Date()) &&
        this.huespedes > 0 &&
        this.noches > 0 &&
        this.total > 0;

      this.error = this.datosValidos
        ? ''
        : 'No encontramos una cotización válida. Regresa al alojamiento y verifica las fechas.';
    });
  }

  guardarReserva(): void {
    this.error = '';
    this.mensajeExito = '';

    const nombre = this.titular.trim();
    const email = this.correo.trim();

    if (!this.datosValidos) {
      this.error =
        'No hay una cotización válida para realizar la reserva.';
      return;
    }

    if (!nombre || nombre.length < 3) {
      this.error =
        'Ingresa el nombre completo del titular.';
      return;
    }

    if (nombre.length > 100) {
      this.error =
        'El nombre no puede superar los 100 caracteres.';
      return;
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      this.error =
        'Ingresa un correo electrónico válido.';
      return;
    }

    const reserva: DatosReserva = {
      id: this.generarId(),
      alojamientoId: this.alojamientoId,
      alojamiento: this.alojamiento,
      ciudad: this.ciudad,
      imagen: this.imagen,
      fechaLlegada: this.fechaLlegada,
      fechaSalida: this.fechaSalida,
      huespedes: this.huespedes,
      noches: this.noches,
      total: this.total,
      titular: nombre,
      correo: email,
      estado: 'CONFIRMADA',
      fechaRegistro: new Date().toISOString()
    };

    try {
      const almacenadas =
        localStorage.getItem('roomly_reservas');

      const reservas: DatosReserva[] = almacenadas
        ? JSON.parse(almacenadas)
        : [];

      if (!Array.isArray(reservas)) {
        throw new Error('Formato de reservas inválido');
      }

      reservas.push(reserva);

      localStorage.setItem(
        'roomly_reservas',
        JSON.stringify(reservas)
      );

      this.reservaGuardada = true;
      this.mensajeExito =
        '¡Tu reserva se ha registrado correctamente!';

    } catch (e) {
      console.error('Error al guardar la reserva:', e);

      this.error =
        'No fue posible guardar la reserva en este navegador. Verifica el almacenamiento local.';
    }
  }

  formatearPrecio(valor: number): string {
    return valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    });
  }

  private generarId(): string {
    return 'RES-' +
      Date.now().toString(36).toUpperCase() +
      '-' +
      Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  private fechaLocal(fecha: Date): string {
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }
}
