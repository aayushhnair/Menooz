import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid } from 'react-native';

export const requestLocationPermissions = async () => {
  try {
      // Check if location is already in AsyncStorage
      const storedLocation = await AsyncStorage.getItem('location');
      
      if (storedLocation) {
          console.log('Location already stored:', storedLocation);
      }
       else {

      const locationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const location = await getCurrentLocation();
          console.log('\n\nLocation: ', location);
          await AsyncStorage.setItem('location', JSON.stringify(location));
          console.log('Location permission granted');
          return location;
      } else {
          console.log('Location permission denied');
          // Handle permission denial (e.g., show an alert)
          return null;  // Indicate permission not granted
      }}
  } catch (error) {
      console.error('Error getting location permissions:', error);
      throw error;
  }
};

export const requestNewLocationPermissions = async () => {
    try {
      const locationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
  
      if (locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
        const location = await getCurrentLocation();
        console.log('\n\nNew Location: ', location);
        await AsyncStorage.setItem('location', JSON.stringify(location));
        console.log('Location permission granted');
        return location;
      } else {
        console.log('Location permission denied');
        // Handle permission denial (e.g., show an alert)
        return null;  // Indicate permission not granted
      }
    } catch (error) {
      console.error('Error getting location permissions:', error);
      throw error;
    }
  };
  

  export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position.coords);
        },
        error => {
          console.error('Error getting location:', error);
          reject(error);  // Handle geolocation error
        },
        { enableHighAccuracy: false, timeout: 30000, maximumAge: 20000 }  // Adjusted options
      );
    });
  };
