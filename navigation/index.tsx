import React, { useEffect } from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import AuthStack from './authStack';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';
import { View } from 'react-native';
import Theme, { SYSTEM_THEME } from '../shared/themes/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, onValue, ref, set } from '@firebase/database';

const SplashScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: Theme.theme.backgroundPrimary }]}>
      <ActivityIndicator size={80} color={Theme.theme.colortTextPrimary} />
    </View>
  );
}

async function getTheme() {
  await AsyncStorage.getItem('theme').then((theme) => {
    if (theme) Theme.setTheme(theme);
    else Theme.setTheme(SYSTEM_THEME);
  });
}

export default function RootNavigation() {
  const { user } = useAuthentication();
  const [loading, setLoading] = React.useState(true);
  const colorScheme = useColorScheme();
  const db = getDatabase();
  useEffect(() => {
    Theme.setSystemTheme(colorScheme);
    getTheme();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);
  useEffect(() => {
    if (user?.uid) {
      const dbTheme = ref(db, 'users/' + user.uid + '/theme');
      onValue(dbTheme, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          AsyncStorage.setItem('theme', data);
          if (Theme.currentTheme !== data) {
            Theme.setTheme(data);
            setLoading(true);
          }
        } else set(dbTheme, Theme.currentTheme);
      });
    }
  }, [user]);
  if (loading) return <SplashScreen />;
  return <AuthStack logged={user?.uid} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})