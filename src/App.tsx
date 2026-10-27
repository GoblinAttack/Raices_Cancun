import { Navigate, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { compassOutline, heartOutline, personOutline } from 'ionicons/icons';
import { ZonasProvider } from './context/ZonasContext';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Explorar from './pages/Explorar';
import Favoritos from './pages/Favoritos';
import Perfil from './pages/Perfil';
import DetalleZona from './pages/DetalleZona';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="explorar" element={<Explorar />} />
      <Route path="favoritos" element={<Favoritos />} />
      <Route path="perfil" element={<Perfil />} />
      <Route index element={<Navigate to="explorar" replace />} />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="explorar" href="/tabs/explorar">
        <IonIcon aria-hidden="true" icon={compassOutline} />
        <IonLabel>Explorar</IonLabel>
      </IonTabButton>
      <IonTabButton tab="favoritos" href="/tabs/favoritos">
        <IonIcon aria-hidden="true" icon={heartOutline} />
        <IonLabel>Favoritos</IonLabel>
      </IonTabButton>
      <IonTabButton tab="perfil" href="/tabs/perfil">
        <IonIcon aria-hidden="true" icon={personOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

const App: React.FC = () => (
  <IonApp>
    <ZonasProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detalle-zona/:id" element={<DetalleZona />} />
          <Route path="/tabs/*" element={<Tabs />} />
          <Route path="/" element={<Navigate to="/inicio" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </ZonasProvider>
  </IonApp>
);

export default App;
