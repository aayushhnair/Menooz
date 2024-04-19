//Library Imports
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

//Local Imports
import {moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import GText from './GText';

export default function GButton({
  title,
  textType,
  color,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  children,
  bgColor = null,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        {backgroundColor: bgColor},
      ]}
      onPress={onPress}
      {...props}>
      {/* If Icon Added In Button Front Side */}
      {frontIcon && <View style={styles.mr20}>{frontIcon}</View>}
      {/* Text In Button */}
      {!!title && (
        <GText type={textType} color={color} align={'center'} style={style}>
          {title}
        </GText>
      )}
      {/* If Icon Added In Button Back Side */}
      {icon}
      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    ...styles.pv15,
    borderRadius: moderateScale(15),
  },
});
