import {ImageBackground, StyleSheet, View} from 'react-native';
import React from 'react';
import images from '../../assets/images';
import {colors, styles} from '../../themes';
import GButton from '../../components/common/GButton';
import strings from '../../i18n/strings';
import GText from '../../components/common/GText';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../navigation/NavigationKeys';

const OnBoarding2 = () => {
  const navigation = useNavigation();
  const navigateToAuth = () => {
    navigation.navigate(StackNav.Auth);
  };
  const navigateToSignUp = () => {
    navigation.navigate(StackNav.Auth, {screen: StackNav.SignUp});
  };

  return (
    <ImageBackground source={images.welCome} style={localStyles.imageContainer}>
      <View style={localStyles.innerContainer}>
        <View style={localStyles.txtContainer}>
          <GText type={'b36'}>{strings.welCome}</GText>
          <GText type={'b36'} color={colors.green}>
            {strings.eGrocery}
          </GText>
        </View>
        <View>
          <GButton
            onPress={navigateToAuth}
            textType={'b16'}
            color={colors.white}
            bgColor={colors.green}
            title={strings.continueWithMobileNumber}
            containerStyle={localStyles.btnContainer}
          />
          <GButton
            onPress={navigateToSignUp}
            textType={'b16'}
            color={colors.textColor}
            bgColor={colors.white}
            title={strings.createAccount}
            containerStyle={[localStyles.btnContainer, styles.mb50]}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnBoarding2;

const localStyles = StyleSheet.create({
  imageContainer: {
    ...styles.flex,
  },
  innerContainer: {
    ...styles.flex,
    ...styles.justifyBetween,
  },
  txtContainer: {
    ...styles.mt100,
    ...styles.ml30,
  },
  btnContainer: {
    ...styles.mh20,
    ...styles.pv20,
    ...styles.mv10,
  },
});
