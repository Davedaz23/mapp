import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
import { requestNotificationPermission, notificationListeners } from './src/config/notificationService';

enableScreens();

const App: React.FC = () => {
  useEffect(() => {
    requestNotificationPermission();
    notificationListeners();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
};

export default App;
