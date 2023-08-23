import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from '../screens/public/SignIn';
import SignOutScreen from '../screens/public/SignUp';
import Constants from 'expo-constants';
import Theme from '../shared/themes/theme';
import LayoutScreen from '../screens/private/Layout';
const Stack = createStackNavigator();

export default function AuthStack({ logged }: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: Constants.statusBarHeight,
            backgroundColor: Theme.theme.backgroundPrimary,
            borderBottomWidth: 0,
          },
          headerBackImage: () => null,
          headerBackground: () => Theme.theme.backgroundPrimary,
        }}>
        {logged ? <Stack.Screen name="private" options={{headerShown: false}} component={LayoutScreen} />
          : <>
            <Stack.Screen name="sign-in" options={{headerShown: false}} component={SignInScreen} />
            <Stack.Screen name="sign-up" options={{headerShown: false}} component={SignOutScreen} />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}