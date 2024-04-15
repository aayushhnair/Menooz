import React, {useContext, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation, { AuthNavigation } from './Type/StackNavigation';
import { AuthContext, AuthProvider } from '../Api/Authentication';

export default function AppNavigator() {

  const {user, accessToken} = useContext(AuthContext)
  if (user) {
    console.log("\n\nUID: ", user.uid);
  } else {
    console.log("\n\nUser is null");
  }
  
  return (
      <NavigationContainer>
      {accessToken ? <StackNavigation /> : <AuthNavigation />}
      </NavigationContainer>
  );
} 
