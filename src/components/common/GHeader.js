import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {getHeight, getWidth, moderateScale} from '../../common/constants';
import {BackArrow, BackArrowWhite} from '../../assets/svgs';
import GText from './GText';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import GButton from './GButton';
import {getDeviceType} from '../../utils/helpers';

const GHeader = ({style, headerTitle, titleColor, isBackWhite}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[localStyles.container, style]}>
      <View style={localStyles.headerTitle}>
        <GText
          type="b18"
          align="center"
          color={titleColor ? titleColor : colors.appwhite}>
          {headerTitle}
        </GText>
      </View>
      <View style={localStyles.BackArrow}>
        <GButton onPress={goBack}>
          {isBackWhite ? <BackArrowWhite /> : <BackArrow />}
        </GButton>
      </View>
    </View>
  );
};

export default GHeader;

const localStyles = StyleSheet.create({
  container: {
    height: getDeviceType() == 1 ? getHeight(60) : getHeight(56),
    ...styles.flexRow,
    ...styles.justifyBetween,
    backgroundColor: colors.appblack,
    borderBottomWidth: 1,
    borderBottomColor: colors.appyellow,
  },
  BackArrow: {
    position: 'absolute',
    left: moderateScale(20),
    ...styles.selfCenter,
  },
  headerTitle: {
    ...styles.flex,
    ...styles.justifyCenter,
  },
});
