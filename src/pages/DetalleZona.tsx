import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router';
import { cashOutline, hourglassOutline, mapOutline, star, timeOutline } from 'ionicons/icons';
import { useZonas } from '../context/ZonasContext';
import { useUbicacion } from '../hooks/useUbicacion';

const DetalleZona: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { zonas } = useZonas();
  const { abrirEnGoogleMaps } = useUbicacion();

  const zona = zonas.find((z) => z.id === id);

  if (!zona) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/explorar" />
            </IonButtons>
            <IonTitle>Zona no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="danger">
            <p>No se encontró la zona arqueológica solicitada.</p>
          </IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/explorar" />
          </IonButtons>
          <IonTitle>{zona.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonImg src={zona.portada} alt={`Portada de ${zona.nombre}`} />

        <div className="ion-padding">
          <h1>{zona.nombre}</h1>
          <IonText color="medium">
            <p>{zona.subtitulo}</p>
          </IonText>
          <p>
            <IonIcon icon={star} color="warning" aria-hidden="true" /> {zona.calificacion.toFixed(1)}{' '}
            <IonText color="medium">({zona.totalResenas} reseñas)</IonText>
          </p>
          <p>{zona.descripcion}</p>
        </div>

        <IonList inset>
          <IonListHeader>
            <IonLabel>Información de la visita</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonIcon icon={timeOutline} slot="start" aria-hidden="true" />
            <IonLabel>
              <h3>Horario</h3>
              <p>{zona.horario}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={cashOutline} slot="start" aria-hidden="true" />
            <IonLabel>
              <h3>Costo</h3>
              <p>{zona.costo}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={hourglassOutline} slot="start" aria-hidden="true" />
            <IonLabel>
              <h3>Tiempo estimado</h3>
              <p>{zona.tiempoEstimado}</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <div className="ion-padding-horizontal">
          <IonButton
            expand="block"
            onClick={() =>
              abrirEnGoogleMaps(zona.coordenadas.lat, zona.coordenadas.lng, zona.nombre)
            }
          >
            <IonIcon icon={mapOutline} slot="start" aria-hidden="true" />
            Ubicación en Mapa
          </IonButton>
        </div>

        {zona.galeria.length > 0 && (
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonText>
                  <h2>Galería</h2>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              {zona.galeria.map((foto, indice) => (
                <IonCol size="6" key={foto}>
                  <IonImg src={foto} alt={`${zona.nombre}, foto ${indice + 1}`} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DetalleZona;
