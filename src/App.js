import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import AppNavigator from './navigation';
import {colors, styles} from './themes';

const App = () => {
  return (
    <View style={styles.flex}>
      <StatusBar
        backgroundColor={colors.appblack}
        barStyle={'light-content'}
      />
      <AppNavigator />
    </View>
  );
};

export default App;
