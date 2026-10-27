export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface ZonaArqueologica {
  id: string;
  nombre: string;
  subtitulo: string;
  calificacion: number;
  totalResenas: number;
  descripcion: string;
  horario: string;
  costo: string;
  tiempoEstimado: string;
  coordenadas: Coordenadas;
  portada: string;
  galeria: string[];
  esFavorito?: boolean;
}
