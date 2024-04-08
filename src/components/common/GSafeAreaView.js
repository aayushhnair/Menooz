import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

export default GSafeAreaView = ({children, ...props}) => {
  return (
    <SafeAreaView {...props} style={props.style}>
      {children}
    </SafeAreaView>
  );
};
