import { Component } from '@angular/core';

interface Alojamiento {
  id: number;
  nombre: string;
  pais: 'Colombia';
  ciudad: string;
  departamento: string;
  tipo: string;
  huespedes: number;
  precio: number;
  imagen: string;
  descripcion: string;
  servicios: string[];
  calificacion: number;
}

@Component({
  selector: 'app-alojamientocomponent',
  templateUrl: './alojamientocomponent.html',
  styleUrls: ['./alojamientocomponent.css'],
  standalone: false
})
export class Alojamientocomponent {
  paisSeleccionado: string = 'Colombia';
  ciudadSeleccionada: string = '';
  precioMinimo: number | null = null;
  precioMaximo: number | null = null;

  ciudades: string[] = [
    'Bogotá',
    'Medellín',
    'Guatapé',
    'Cartagena',
    'Santa Marta',
    'Cali',
    'Pereira',
    'Villa de Leyva',
    'San Andrés',
    'Manizales'
  ];

  alojamientos: Alojamiento[] = [
    {
      id: 1,
      nombre: 'Cabaña con vista al embalse',
      pais: 'Colombia',
      ciudad: 'Guatapé',
      departamento: 'Antioquia',
      tipo: 'Cabaña',
      huespedes: 4,
      precio: 280000,
      imagen: 'assets/imagen1.jpg',
      descripcion: 'Disfruta de una cabaña acogedora con una hermosa vista al embalse de Guatapé.',
      servicios: ['WiFi', 'Cocina', 'Parqueadero'],
      calificacion: 4.9
    },
    {
      id: 2,
      nombre: 'Casa campestre cerca de la Piedra',
      pais: 'Colombia',
      ciudad: 'Guatapé',
      departamento: 'Antioquia',
      tipo: 'Casa campestre',
      huespedes: 6,
      precio: 350000,
      imagen: 'assets/imagen2.jpg',
      descripcion: 'Una casa ideal para descansar en familia y conocer los paisajes de Guatapé.',
      servicios: ['Piscina', 'WiFi', 'Zona BBQ'],
      calificacion: 4.8
    },
    {
      id: 3,
      nombre: 'Apartamento moderno en El Poblado',
      pais: 'Colombia',
      ciudad: 'Medellín',
      departamento: 'Antioquia',
      tipo: 'Apartamento',
      huespedes: 3,
      precio: 190000,
      imagen: 'assets/places1.jpg',
      descripcion: 'Apartamento moderno, cerca de restaurantes, comercios y lugares turísticos.',
      servicios: ['WiFi', 'Cocina', 'TV'],
      calificacion: 4.7
    },
    {
      id: 4,
      nombre: 'Apartamento con vista a Bogotá',
      pais: 'Colombia',
      ciudad: 'Bogotá',
      departamento: 'Cundinamarca',
      tipo: 'Apartamento',
      huespedes: 2,
      precio: 160000,
      imagen: 'assets/imagen3.jpg',
      descripcion: 'Alojamiento cómodo para descubrir la capital de Colombia.',
      servicios: ['WiFi', 'TV', 'Cocina'],
      calificacion: 4.6
    },
    {
      id: 5,
      nombre: 'Casa frente al mar',
      pais: 'Colombia',
      ciudad: 'Cartagena',
      departamento: 'Bolívar',
      tipo: 'Casa',
      huespedes: 5,
      precio: 420000,
      imagen: 'assets/imagen4.jpg',
      descripcion: 'Descansa cerca de las playas y disfruta del ambiente del Caribe colombiano.',
      servicios: ['Piscina', 'WiFi', 'Aire acondicionado'],
      calificacion: 4.9
    },
    {
      id: 6,
      nombre: 'Cabaña tropical',
      pais: 'Colombia',
      ciudad: 'Santa Marta',
      departamento: 'Magdalena',
      tipo: 'Cabaña',
      huespedes: 4,
      precio: 240000,
      imagen: 'assets/place2.jpg',
      descripcion: 'Un espacio tranquilo para disfrutar de la naturaleza y el mar.',
      servicios: ['Jardín', 'WiFi', 'Cocina'],
      calificacion: 4.8
    },
    {
      id: 7,
      nombre: 'Apartamento en el centro',
      pais: 'Colombia',
      ciudad: 'Cali',
      departamento: 'Valle del Cauca',
      tipo: 'Apartamento',
      huespedes: 3,
      precio: 130000,
      imagen: 'assets/cali1.jpg',
      descripcion: 'Un alojamiento práctico para explorar la cultura y gastronomía caleña.',
      servicios: ['WiFi', 'TV', 'Cocina'],
      calificacion: 4.5
    },
    {
      id: 8,
      nombre: 'Casa colonial',
      pais: 'Colombia',
      ciudad: 'Villa de Leyva',
      departamento: 'Boyacá',
      tipo: 'Casa colonial',
      huespedes: 6,
      precio: 310000,
      imagen: 'assets/imagen2.jpg',
      descripcion: 'Una casa con encanto colonial para disfrutar de la historia y tranquilidad del pueblo.',
      servicios: ['Patio', 'Cocina', 'WiFi'],
      calificacion: 4.8
    },
    {
      id: 9,
      nombre: 'Cabaña cerca del mar',
      pais: 'Colombia',
      ciudad: 'San Andrés',
      departamento: 'Archipiélago de San Andrés, Providencia y Santa Catalina',
      tipo: 'Cabaña',
      huespedes: 2,
      precio: 260000,
      imagen: 'assets/imagen1.jpg',
      descripcion: 'Un lugar acogedor para disfrutar de las playas y el mar de los siete colores.',
      servicios: ['Aire acondicionado', 'WiFi', 'Terraza'],
      calificacion: 4.7
    },
    {
      id: 10,
      nombre: 'Finca cafetera',
      pais: 'Colombia',
      ciudad: 'Pereira',
      departamento: 'Risaralda',
      tipo: 'Finca',
      huespedes: 5,
      precio: 290000,
      imagen: 'assets/pereira1.jpg',
      descripcion: 'Vive una experiencia rodeada de montañas, naturaleza y cafetales.',
      servicios: ['Jardín', 'Parqueadero', 'Cocina'],
      calificacion: 4.9
    }
  ];

  get alojamientosFiltrados(): Alojamiento[] {
    return this.alojamientos.filter((alojamiento) => {
      const coincideCiudad =
        this.ciudadSeleccionada === '' ||
        alojamiento.ciudad === this.ciudadSeleccionada;

      const coincidePrecioMinimo =
        this.precioMinimo === null ||
        this.precioMinimo === undefined ||
        alojamiento.precio >= this.precioMinimo;

      const coincidePrecioMaximo =
        this.precioMaximo === null ||
        this.precioMaximo === undefined ||
        this.precioMaximo === 0 ||
        alojamiento.precio <= this.precioMaximo;

      return coincideCiudad && coincidePrecioMinimo && coincidePrecioMaximo;
    });
  }

  limpiarFiltros(): void {
    this.ciudadSeleccionada = '';
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
