import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackRoute } from '../NavigationRoutes';
import { StackNav } from '../NavigationKeys';

const Stack = createNativeStackNavigator();

export function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.Login}>
      {/* <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} /> */}
      <Stack.Screen name={StackNav.Login} component={StackRoute.Login} />
      <Stack.Screen name={StackNav.SignUp} component={StackRoute.SignUp} />
      {/* <Stack.Screen
        name={StackNav.OtpVerification}
        component={StackRoute.OtpVerification}
      /> */}
    </Stack.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.TabBar}>

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
      <Stack.Screen
        name={StackNav.ProductDetail}
        component={StackRoute.ProductDetail}
      />
      <Stack.Screen
        name={StackNav.Cart}
        component={StackRoute.Cart}
      />
      <Stack.Screen
        name={StackNav.CheckOut}
        component={StackRoute.CheckOut}
      />
      <Stack.Screen
        name={StackNav.OrderPage}
        component={StackRoute.OrderPage}
      />
      <Stack.Screen
        name={StackNav.MyOrder}
        component={StackRoute.MyOrder}
      />
      <Stack.Screen
        name={StackNav.OrderDetails}
        component={StackRoute.OrderDetails}
      />
      <Stack.Screen
        name={StackNav.EditProfile}
        component={StackRoute.EditProfile}
      />
      <Stack.Screen
        name={StackNav.Notification}
        component={StackRoute.Notification}
      />
            <Stack.Screen
        name={StackNav.OfferAndPromos}
        component={StackRoute.OfferAndPromos}
      />
            <Stack.Screen
        name={StackNav.Setting}
        component={StackRoute.Setting}
      />
    </Stack.Navigator>

  );
}
