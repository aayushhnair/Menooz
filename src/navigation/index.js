import React, {useContext, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation, { AuthNavigation } from './Type/StackNavigation';
import { AuthContext, AuthProvider } from '../Api/Authentication';

export default function AppNavigator() {

  const {accessToken} = useContext(AuthContext)
  console.log("\n\nUserData at Indnex: ",accessToken)
  
  return (
      <NavigationContainer>
      {accessToken ? <StackNavigation /> : <AuthNavigation />}
      </NavigationContainer>
  );
} 
