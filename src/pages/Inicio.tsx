import { IonButton, IonContent, IonIcon, IonPage, useIonRouter } from '@ionic/react';
import { arrowForwardOutline, business } from 'ionicons/icons';

const Inicio: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent color="primary" className="ion-padding ion-text-center">
        <div
          className="ion-display-flex ion-flex-column ion-justify-content-between"
          style={{ height: '100%' }}
        >
          <div className="ion-display-flex ion-flex-column ion-flex-1 ion-justify-content-center ion-align-items-center">
            <IonIcon icon={business} style={{ fontSize: '96px' }} aria-hidden="true" />
            <h1>RAÍCES CANCÚN</h1>
            <p>Descubre nuestra historia</p>
          </div>

          <IonButton
            shape="round"
            color="light"
            expand="block"
            onClick={() => router.push('/login', 'forward')}
          >
            Comenzar
            <IonIcon icon={arrowForwardOutline} slot="end" aria-hidden="true" />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;
