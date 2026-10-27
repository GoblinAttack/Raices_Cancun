import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useZonas } from '../context/ZonasContext';

const Favoritos: React.FC = () => {
  const { favoritos, toggleFavorito } = useZonas();
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {favoritos.length === 0 ? (
          <div className="ion-padding ion-text-center">
            <IonIcon icon={heartOutline} size="large" color="medium" aria-hidden="true" />
            <IonText color="medium">
              <h2>Aún no tienes lugares guardados</h2>
              <p>Toca el corazón en cualquier zona arqueológica para agregarla a tus favoritos.</p>
            </IonText>
          </div>
        ) : (
          <IonList>
            {favoritos.map((zona) => (
              <IonItem
                key={zona.id}
                button
                detail={false}
                onClick={() => router.push(`/detalle-zona/${zona.id}`, 'forward')}
              >
                <IonThumbnail slot="start">
                  <IonImg src={zona.portada} alt={`Portada de ${zona.nombre}`} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{zona.nombre}</h2>
                  <p>{zona.subtitulo}</p>
                </IonLabel>
                <IonButton
                  slot="end"
                  fill="clear"
                  color="danger"
                  aria-label={`Quitar ${zona.nombre} de favoritos`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorito(zona.id);
                  }}
                >
                  <IonIcon slot="icon-only" icon={heart} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Favoritos;
