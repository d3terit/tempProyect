import { initializeApp } from "@firebase/app";
import '@firebase/auth';
import '@firebase/database';
import Constants from 'expo-constants';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
    authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
    databaseURL: Constants.expoConfig?.extra?.firebaseDatabaseUrl,
    projectId: Constants.expoConfig?.extra?.firebaseProjectId,
    storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
    messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
    appId: Constants.expoConfig?.extra?.firebaseAppId,
};  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;