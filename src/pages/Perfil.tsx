import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import {
  heartOutline,
  informationCircleOutline,
  logOutOutline,
  personCircleOutline,
  settingsOutline
} from 'ionicons/icons';

const Perfil: React.FC = () => {
  const router = useIonRouter();

  const cerrarSesion = () => {
    router.push('/login', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem lines="full">
            <IonAvatar slot="start">
              <IonIcon icon={personCircleOutline} size="large" aria-hidden="true" />
            </IonAvatar>
            <IonLabel>
              <h1>Usuario Ejemplo</h1>
              <p>usuario@ejemplo.com</p>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonList>
          <IonItem button onClick={() => router.push('/tabs/favoritos', 'root')}>
            <IonIcon icon={heartOutline} slot="start" aria-hidden="true" />
            <IonLabel>Mis favoritos</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon icon={settingsOutline} slot="start" aria-hidden="true" />
            <IonLabel>Configuración</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon icon={informationCircleOutline} slot="start" aria-hidden="true" />
            <IonLabel>Acerca de Raíces Cancún</IonLabel>
          </IonItem>
          <IonItem button onClick={cerrarSesion}>
            <IonIcon icon={logOutOutline} slot="start" color="danger" aria-hidden="true" />
            <IonLabel color="danger">Cerrar sesión</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
