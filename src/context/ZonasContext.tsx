import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ZonaArqueologica } from '../models/zona.model';

interface ZonasContextValue {
  zonas: ZonaArqueologica[];
  favoritos: ZonaArqueologica[];
  toggleFavorito: (id: string) => void;
}

const ZONAS_MOCK: ZonaArqueologica[] = [
  {
    id: 'el-rey',
    nombre: 'El Rey',
    subtitulo: 'Zona Hotelera, Cancún',
    calificacion: 4.5,
    totalResenas: 1280,
    descripcion:
      'Antiguo centro ceremonial y administrativo maya ubicado en la Zona Hotelera de Cancún. Destaca por su templo principal y por las iguanas que habitan el sitio.',
    horario: 'Lunes a domingo, 8:00 - 16:30',
    costo: '$80 MXN',
    tiempoEstimado: '1 hora',
    coordenadas: { lat: 21.0603, lng: -86.7787 },
    portada: '/assets/zonas/el-rey/portada.jpg',
    galeria: ['/assets/zonas/el-rey/1.jpg', '/assets/zonas/el-rey/2.jpg'],
    esFavorito: false,
  },
  {
    id: 'san-miguelito',
    nombre: 'San Miguelito',
    subtitulo: 'Zona Hotelera, Cancún',
    calificacion: 4.3,
    totalResenas: 860,
    descripcion:
      'Sitio arqueológico dentro del Museo Maya de Cancún. Conserva estructuras del Posclásico, entre ellas el templo conocido como "El Templo del Alacrán".',
    horario: 'Martes a domingo, 9:00 - 17:00',
    costo: '$90 MXN',
    tiempoEstimado: '1.5 horas',
    coordenadas: { lat: 21.0863, lng: -86.7762 },
    portada: '/assets/zonas/san-miguelito/portada.jpg',
    galeria: ['/assets/zonas/san-miguelito/1.jpg', '/assets/zonas/san-miguelito/2.jpg'],
    esFavorito: false,
  },
  {
    id: 'el-meco',
    nombre: 'El Meco',
    subtitulo: 'Punta Sam, Isla Mujeres',
    calificacion: 4.4,
    totalResenas: 540,
    descripcion:
      'Antiguo puerto maya al norte de Cancún. Su estructura principal, "El Castillo", es de las más altas de la costa norte de Quintana Roo.',
    horario: 'Lunes a domingo, 8:00 - 17:00',
    costo: '$55 MXN',
    tiempoEstimado: '1 hora',
    coordenadas: { lat: 21.1967, lng: -86.8019 },
    portada: '/assets/zonas/el-meco/portada.jpg',
    galeria: ['/assets/zonas/el-meco/1.jpg', '/assets/zonas/el-meco/2.jpg'],
    esFavorito: false,
  },
];

const ZonasContext = createContext<ZonasContextValue | undefined>(undefined);

export const ZonasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zonas, setZonas] = useState<ZonaArqueologica[]>(ZONAS_MOCK);

  const toggleFavorito = useCallback((id: string) => {
    setZonas((actuales) =>
      actuales.map((zona) => (zona.id === id ? { ...zona, esFavorito: !zona.esFavorito } : zona))
    );
  }, []);

  const favoritos = useMemo(() => zonas.filter((zona) => zona.esFavorito), [zonas]);

  const value = useMemo(
    () => ({ zonas, favoritos, toggleFavorito }),
    [zonas, favoritos, toggleFavorito]
  );

  return <ZonasContext.Provider value={value}>{children}</ZonasContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useZonas = (): ZonasContextValue => {
  const context = useContext(ZonasContext);
  if (!context) {
    throw new Error('useZonas debe usarse dentro de un <ZonasProvider>');
  }
  return context;
};
