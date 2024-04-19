// Library Imports
import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';

// Local Imports
import {moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import {checkPlatform} from '../../utils/helpers';

// KeyboardAvoidWrapper Component
export default GKeyBoardAvoidingWrapper = ({
  children,
  containerStyle,
  contentContainerStyle,
}) => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={
        checkPlatform() === 'ios' ? moderateScale(10) : null
      }
      style={[styles.flex, containerStyle]}
      behavior={checkPlatform() === 'ios' ? 'padding' : null}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
