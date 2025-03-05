import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import { app } from './firebase'; // Import firebase app to initialize

// Ensure firebase app is initialized before using services
if (!app) {
  console.error("🔥 Firebase app is not initialized");
}

export const requestNotificationPermission = async (): Promise<void> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('✅ Notification permission granted');
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
  } else {
    console.log('❌ Notification permission denied');
  }
};

export const notificationListeners = (): void => {
  messaging().onMessage(async (remoteMessage) => {
    console.log('🚨 Foreground Notification:', remoteMessage);
    Alert.alert(
      remoteMessage.notification?.title ?? 'New Notification',
      remoteMessage.notification?.body ?? ''
    );
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('🎯 Background Notification:', remoteMessage);
  });
};
