import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Type/StackNavigation';
import { AuthProvider } from '../Api/Authentication';

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
