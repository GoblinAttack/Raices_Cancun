import { useMemo, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useZonas } from '../context/ZonasContext';

// Minúsculas y sin acentos para que "cancun" encuentre "Cancún"
const normalizar = (texto: string): string =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const Explorar: React.FC = () => {
  const { zonas, toggleFavorito } = useZonas();
  const router = useIonRouter();
  const [busqueda, setBusqueda] = useState('');

  const zonasFiltradas = useMemo(() => {
    const termino = normalizar(busqueda.trim());
    if (!termino) return zonas;
    return zonas.filter(
      (zona) =>
        normalizar(zona.nombre).includes(termino) ||
        normalizar(zona.subtitulo).includes(termino)
    );
  }, [zonas, busqueda]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Explorar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={busqueda}
          placeholder="Buscar zona arqueológica"
          debounce={150}
          onIonInput={(e) => setBusqueda(e.detail.value ?? '')}
          onIonClear={() => setBusqueda('')}
        />

        <IonList lines="none">
          {zonasFiltradas.map((zona) => (
            <IonCard
              key={zona.id}
              button
              onClick={() => router.push(`/detalle-zona/${zona.id}`, 'forward')}
            >
              <IonImg src={zona.portada} alt={`Portada de ${zona.nombre}`} />
              <IonCardHeader>
                <IonCardTitle>{zona.nombre}</IonCardTitle>
                <IonCardSubtitle>{zona.subtitulo}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="ion-text-end">
                <IonButton
                  fill="clear"
                  aria-label={
                    zona.esFavorito
                      ? `Quitar ${zona.nombre} de favoritos`
                      : `Agregar ${zona.nombre} a favoritos`
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(zona.id);
                  }}
                >
                  <IonIcon
                    slot="icon-only"
                    icon={zona.esFavorito ? heart : heartOutline}
                    color={zona.esFavorito ? 'danger' : undefined}
                  />
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}

          {zonasFiltradas.length === 0 && (
            <IonItem>
              <IonLabel>No se encontraron zonas arqueológicas.</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Explorar;
