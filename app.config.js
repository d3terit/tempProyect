import 'dotenv/config';

export default {
  "expo": {
    "name": "inter-app",
    "slug": "inter-app",
    "runtimeVersion": "1.0.0",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*",
      "assets/**/*.glb"
    ],
    "ios": {
      "supportsTablet": true,
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.interapp.interapp",
      "versionCode": 1,
      "permissions": ["NETWORK"]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "updates": {
      "url": "https://u.expo.dev/88027de7-8d95-484f-88de-bd006c75ce2e"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      "eas": {
        "projectId": "88027de7-8d95-484f-88de-bd006c75ce2e"
      }
    }
  }
}
