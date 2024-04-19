import React , {useEffect} from 'react';
import { StatusBar, View } from 'react-native';
import AppNavigator from './navigation';
import { colors, styles } from './themes';
import { AuthProvider } from './Api/Authentication';
import { requestLocationPermissions } from './Api/locationService';


const App = () => {

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
