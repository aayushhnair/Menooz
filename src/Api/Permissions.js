import { PermissionsAndroid } from 'react-native';

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      && granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Storage permissions granted');
    } else {
      console.log('Storage permissions denied');
    }
  } catch (error) {
    console.error('Error requesting storage permissions:', error);
  }
};

// Call the function when needed, such as when the app starts or when accessing storage.
export default requestStoragePermission;
