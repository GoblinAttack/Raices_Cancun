import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { lockClosedOutline, logoFacebook, logoGoogle, mailOutline } from 'ionicons/icons';

const Login: React.FC = () => {
  const router = useIonRouter();

  const iniciarSesion = () => {
    router.push('/tabs/explorar', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'transparent' } as React.CSSProperties}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1 className="ion-text-center">RAÍCES CANCÚN</h1>
        <p className="ion-text-center">
          Crea tu cuenta o inicia sesión para guardar tus lugares favoritos
        </p>

        <IonInput
          type="email"
          label="Correo electrónico"
          labelPlacement="floating"
          fill="outline"
          autocomplete="email"
          className="ion-margin-bottom"
        >
          <IonIcon slot="start" icon={mailOutline} aria-hidden="true" />
        </IonInput>

        <IonInput
          type="password"
          label="Contraseña"
          labelPlacement="floating"
          fill="outline"
          autocomplete="current-password"
          className="ion-margin-bottom"
        >
          <IonIcon slot="start" icon={lockClosedOutline} aria-hidden="true" />
        </IonInput>

        <IonButton expand="block" onClick={iniciarSesion}>
          Iniciar sesión
        </IonButton>

        <p className="ion-text-center">o continuar con</p>

        <IonButton expand="block" fill="outline">
          <IonIcon slot="start" icon={logoGoogle} aria-hidden="true" />
          Continuar con Google
        </IonButton>
        <IonButton expand="block" fill="outline">
          <IonIcon slot="start" icon={logoFacebook} aria-hidden="true" />
          Continuar con Facebook
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
