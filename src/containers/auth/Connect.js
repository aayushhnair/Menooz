import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import {colors, styles} from '../../themes';
import {
  Apple_logo,
  CartGreen,
  Fb_logo,
  Google_logo,
  Twitter_logo,
} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import margin from '../../themes/margin';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import strings from '../../i18n/strings';
import {StackNav} from '../../navigation/NavigationKeys';

const Connect = ({navigation}) => {
  const IconContainer = ({children}) => {
    return <TouchableOpacity>{children}</TouchableOpacity>;
  };
  const onPressLoginWithEmail = () => {
    navigation.navigate(StackNav.Login);
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <View style={localStyles.logoContainer}>
        <CartGreen />
      </View>
      <GText type="b36" style={margin.mt20} color={colors.textColor}>
        {strings.welCome}
      </GText>
      <GText type="b36" style={margin.mt5} color={colors.green}>
        {strings.app_start_name.toUpperCase()} {strings.dash} {strings.app_name}
      </GText>
      <GButton
        containerStyle={localStyles.btnStyle}
        textType="b16"
        bgColor={colors.green}
        title={strings.loginWithEmail}
        color={colors.white}
        onPress={onPressLoginWithEmail}
      />
      <GText type="b20" style={margin.mt30} color={colors.textColor}>
        {strings.or}
      </GText>
      <View style={localStyles.iconContainer}>
        <IconContainer children={<Apple_logo />} />
        <IconContainer children={<Google_logo />} />
        <IconContainer children={<Twitter_logo />} />
        <IconContainer children={<Fb_logo />} />
      </View>
    </GSafeAreaView>
  );
};

export default Connect;

const localStyles = StyleSheet.create({
  root: {
    ...styles.center,
    ...styles.flex,
  },
  logoContainer: {
    ...styles.center,
    ...styles.selfCenter,
    ...styles.p10,
    ...styles.mt100,
    backgroundColor: colors.lightGreen2,
    borderRadius: moderateScale(100),
    width: moderateScale(140),
    height: moderateScale(140),
  },
  btnStyle: {
    ...styles.mt100,
    ...styles.mh20,
    ...styles.center,
    width: moderateScale(374),
  },
  iconContainer: {
    ...styles.flexRow,
    ...styles.justifyEvenly,
    ...styles.mt30,
    ...styles.mb30,
    ...styles.p20,
    width: '100%',
  },
});
