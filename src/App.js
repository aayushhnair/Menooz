import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import AppNavigator from './navigation';
import { colors, styles } from './themes';
import requestStoragePermission from './Api/Permissions';
import { AuthProvider } from './Api/Authentication';

const App = () => {
  requestStoragePermission();
  return (
    <AuthProvider>
    <View style={styles.flex}>
        <StatusBar
          backgroundColor={colors.appblack}
          barStyle={'light-content'}
        />
        <AppNavigator />
    </View>
    </AuthProvider>
  );
};

export default App;
