import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { request, PERMISSIONS, check } from '@react-native-community/permissions';

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const storageStatus = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]);

      if (
        storageStatus['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
        storageStatus['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        console.log('Storage permissions granted');
      } else {
        console.log('Storage permissions denied');
      }

      const locationStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (locationStatus === 'granted') {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  }
};
