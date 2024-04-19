//library imports
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

//import from local
import {moderateScale} from '../../common/constants';
import {colors} from '../../themes';
import GText from './GText';
import padding from '../../themes/padding';
import {Eye_icon} from '../../assets/svgs';
import flex from '../../themes/flex';

const GInput = ({
  label,
  labelStyle,
  keyboardType,
  style,
  rightIcon,
  leftIcon,
  leftIconStyle,
  rightIconStyle,
  toGetTextFieldValue,
  _errorText,
  inputStyle,
  innerInputStyle,
  onFocus,
  onBlur,
  value,
  errorStyle,
  ...props
}) => {
  // Change Text Input Value
  const onChangeText = val => {
    toGetTextFieldValue(val);
  };

  return (
    <View style={[localStyles.container, style]}>
      {label && (
        <View style={[{marginHorizontal: moderateScale(24)}, labelStyle]}>
          <GText type={'m14'} color={colors.labelColor}>
            {label}
          </GText>
        </View>
      )}
      <View
        style={[
          localStyles.inputBox,
          inputStyle,
          label && {marginTop: moderateScale(10)},
        ]}>
        {leftIcon ? ( // if leftIcon is true then show Eye_icon
          <View style={[localStyles.leftIcon, leftIconStyle]}>
            {leftIcon()}
          </View>
        ) : null}
        <TextInput
          value={value}
          keyboardType={keyboardType}
          placeholder={label}
          placeholderTextColor={colors.grayScale5}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[
            {
              color: colors.textColor,
              paddingLeft: leftIcon ? moderateScale(50) : moderateScale(15),
              ...padding.p15,
              width: rightIcon ? '90%' : '100%',
            },
            innerInputStyle,
          ]}
          {...props}
        />
        {rightIcon ? ( // if rightIcon is true then show Eye_icon
          <View style={[localStyles.rightIcon, rightIconStyle]}>
            {rightIcon()}
          </View>
        ) : null}
      </View>
      {/* Error Text Message Of Input */}
      {_errorText?.length ? (
        <GText
          type={'r12'}
          style={[
            localStyles.errorText,
            {
              ...localStyles.errorText,
              color: colors.lightRed,
            },
            errorStyle,
          ]}>
          {_errorText}
        </GText>
      ) : null}
    </View>
  );
};

export default GInput;

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputBox: {
    ...flex.flexRow,
    ...flex.justifyBetween,
    ...flex.itemsCenter,
    backgroundColor: colors.grayScale1,
    marginHorizontal: moderateScale(24),
    borderRadius: moderateScale(7),
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    marginRight: moderateScale(15),
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
    marginLeft: moderateScale(15),
  },
  errorText: {
    marginHorizontal: moderateScale(25),
    marginTop: moderateScale(5),
  },
});
