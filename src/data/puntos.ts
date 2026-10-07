export interface PuntoVenta {
  n: number;
  nombre: string;
  direccion: string;
  /** Sector, barrio o complemento de la dirección. */
  detalle?: string;
  /** Horario de atención, cuando el punto lo define. */
  horario?: string;
}

/** Puntos de venta autorizados (flyer "Nuestros puntos de venta autorizados"). */
export const puntosVenta: PuntoVenta[] = [
  {
    n: 1,
    nombre: 'Tienda El Trueque',
    direccion: 'Carrera 5 # 3-80',
    detalle: 'Sector Histórico de Popayán',
    horario: 'Todos los días, de 9 a. m. a 8 p. m.',
  },
  {
    n: 2,
    nombre: 'Café Gullumus',
    direccion: 'Aeropuerto Popayán',
    detalle: 'Calle 4 Norte, comuna 1',
  },
  {
    n: 3,
    nombre: 'Maní Manía',
    direccion: 'Calle 6a # 18-78',
    detalle: 'La Esmeralda, Popayán',
  },
  {
    n: 4,
    nombre: 'Pacha Mama',
    direccion: 'Carrera 3 # 4-15',
    detalle: 'Centro de Popayán',
    horario: 'Lunes a viernes, de 8:30 a. m. a 5:30 p. m.',
  },
  {
    n: 5,
    nombre: 'Rincón Payanés',
    direccion: 'Carpa 7 A',
    horario: 'Sábados y domingos, de 9 a. m. a 5 p. m.',
  },
];

/** Sello artesanal del flyer. */
export const sellos = [
  { icono: 'hoja', texto: 'Naturales, sin conservantes' },
  { icono: 'corazon', texto: 'Hechos con amor en el Cauca' },
  { icono: 'chonta', texto: 'Con chontaduro de nuestra tierra' },
] as const;
