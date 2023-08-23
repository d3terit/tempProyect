import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { get, getDatabase, ref, set } from '@firebase/database';
import Menu from '../../shared/components/Menu';
import Interpreter from './Interpeter';
import History from './History';
import Glossary from './Glossary';
import Config from './Config';
import Theme from '../../shared/themes/theme';
import axios from 'axios';

const routeComponents: any = {
  interpreter: Interpreter,
  history: History,
  glossary: Glossary,
  settings: Config,
};
export default function LayoutScreen() {
  const { user } = useAuthentication();
  const db = getDatabase();
  useEffect(() => {
    if (user?.uid) {
      const dbUsers = ref(db, 'users/' + user.uid);
      get(dbUsers).then((snapshot: any) => {
        const data = snapshot.val();
        if (!data) {
          set(dbUsers, {
            email: user.email,
            emailVerified: user.emailVerified,
            lastLogin: user.metadata.lastSignInTime,
            uid: user.uid,
          });
        }
      });
    }
  }, [user]);
  const routes = [
    { name: 'Interpreter', path: 'interpreter' },
    { name: 'Historial', path: 'history' },
    { name: 'Glosario', path: 'glossary' },
    { name: 'Configuración', path: 'settings' },
  ];
  const [view, setView] = React.useState(routes[0].path);
  const RenderComponent = routeComponents[view];
  const [currentPhrase, setCurrentPhrase] = React.useState([]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState(0);
  const playPhrase = (phrase: string) => {
    setView('interpreter');
    axios.post('https://back-inter-jn38-dev.fl0.io/translate', { phrase: phrase })
      .then((response:any) => {
        setCurrentPhrase(response.data.result);
        setCurrentPhraseIndex(0);
      }, (error) => {
        console.log(error);
      }
    );
  }
  useEffect(() => {
    if (view === 'interpreter') playPhrase('hola');
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: Theme.theme.backgroundPrimary }]}>
      {RenderComponent && <RenderComponent currentPhrase={currentPhrase}
      currentPhraseIndex={currentPhraseIndex} setCurrentPhraseIndex={setCurrentPhraseIndex} playPhrase={playPhrase}/>}
      <Menu view={view} setView={setView} routes={routes} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});