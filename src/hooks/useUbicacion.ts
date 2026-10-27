import { useCallback, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Coordenadas } from '../models/zona.model';

export const useUbicacion = () => {
  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerUbicacion = useCallback(async (): Promise<Coordenadas | null> => {
    setCargando(true);
    setError(null);
    try {
      if (Capacitor.isNativePlatform()) {
        const permisos = await Geolocation.checkPermissions();
        if (permisos.location !== 'granted') {
          const solicitud = await Geolocation.requestPermissions();
          if (solicitud.location !== 'granted') {
            throw new Error('Permiso de ubicación denegado');
          }
        }
      }

      const posicion = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });
      const actuales = { lat: posicion.coords.latitude, lng: posicion.coords.longitude };
      setCoordenadas(actuales);
      return actuales;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo obtener la ubicación');
      return null;
    } finally {
      setCargando(false);
    }
  }, []);

  const abrirEnGoogleMaps = useCallback((lat: number, lng: number, etiqueta: string) => {
    const etiquetaCodificada = encodeURIComponent(etiqueta);

    if (Capacitor.getPlatform() === 'android') {
      // URL Scheme nativo de Android: abre la app de mapas instalada
      window.open(`geo:${lat},${lng}?q=${lat},${lng}(${etiquetaCodificada})`, '_system');
      return;
    }

    // Respaldo para web/iOS
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      '_blank',
      'noopener,noreferrer'
    );
  }, []);

  return { coordenadas, cargando, error, obtenerUbicacion, abrirEnGoogleMaps };
};
