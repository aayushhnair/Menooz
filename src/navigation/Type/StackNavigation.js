import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackRoute} from '../NavigationRoutes';
import {StackNav} from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  // Auth Stack
  function AuthNavigation() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={StackNav.Login}>
        <Stack.Screen name={StackNav.Login} component={StackRoute.Login} />
        <Stack.Screen name={StackNav.SignUp} component={StackRoute.SignUp} />
        {/* <Stack.Screen
          name={StackNav.OtpVerification}
          component={StackRoute.OtpVerification}
        /> */}
      </Stack.Navigator>
    );
  }
  // Main Stack
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Login}>

      <Stack.Screen name={StackNav.Auth} component={AuthNavigation} />
      <Stack.Screen name={StackNav.TabBar} component={StackRoute.TabBar} />
      <Stack.Screen
        name={StackNav.ForgotPassword}
        component={StackRoute.ForgotPassword}
      />
      <Stack.Screen
        name={StackNav.NewPassword}
        component={StackRoute.NewPassword}
      />
    </Stack.Navigator>
  );
}
