import {StyleSheet} from 'react-native';
import flex from './flex';
import margin from './margin';
import padding from './padding';
import commonStyle from './commonStyle';
import colors from './colors';
import zIndex from './zIndex';
import gap from './gap';
export * from './colors';

// Combine All Styles Here
export const styles = StyleSheet.create({
  ...flex,
  ...margin,
  ...padding,
  ...commonStyle,
  ...colors,
  ...zIndex,
  ...gap,
});
