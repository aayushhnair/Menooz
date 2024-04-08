// Library Imports
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';

//Local Imports
import {StackNav} from '../../navigation/NavigationKeys';
import images from '../../assets/images';
import GText from '../../components/common/GText';
import strings from '../../i18n/strings';
import {APP_OPEN_FIRST_TIME, moderateScale} from '../../common/constants';
import {setAsyncStorageData} from '../../utils/helpers';
import {colors, styles} from '../../themes';

const OnBoarding = ({navigation}) => {
  const swiper = useRef(null);
  const onPressGetStarted = async () => {
    await setAsyncStorageData(APP_OPEN_FIRST_TIME, 'firstTimeOpen');
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.Login}],
    });
  };
  const onNextPress = () => {
    swiper.current?.scrollBy(1, true);
  };
  const OnBoardingScreen = ({bgImage, title, text, next, btnPress}) => {
    return (
      <View style={localStyles.container}>
        <View style={localStyles.imgContainer}>
          <Image source={bgImage} styles={localStyles.image} />
        </View>
        <View style={localStyles.textContainer}>
          <GText type="b26" align="center" color={colors.textColor}>
            {title}
          </GText>
          <GText
            type="m16"
            align="center"
            color={colors.textColor}
            style={styles.mt20}>
            {text}
          </GText>
          <View style={localStyles.btnContainer}>
            <TouchableOpacity onPress={btnPress}>
              <Image source={next} styles={localStyles.image} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Swiper
      loop={false}
      ref={swiper}
      scrollEnabled={false}
      showsButtons={false}
      activeDotColor={colors.white}
      dotColor={colors.white}>
      <View style={localStyles.subContainer}>
        <OnBoardingScreen
          bgImage={images.onBoarding1}
          title={strings.onBoardingTitle1}
          text={strings.onBoardingText1}
          next={images.nextSymbol1}
          btnPress={onNextPress}
        />
      </View>
      <View style={localStyles.subContainer}>
        <OnBoardingScreen
          bgImage={images.onBoarding2}
          title={strings.onBoardingTitle2}
          text={strings.onBoardingText2}
          next={images.nextSymbol2}
          btnPress={onNextPress}
        />
      </View>
      <View style={localStyles.subContainer}>
        <OnBoardingScreen
          bgImage={images.onBoarding3}
          title={strings.onBoardingTitle3}
          text={strings.onBoardingText3}
          next={images.nextSymbol3}
          btnPress={onPressGetStarted}
        />
      </View>
    </Swiper>
  );
};

export default OnBoarding;

const localStyles = StyleSheet.create({
  container: {
    ...styles.flexCenter,
    backgroundColor: colors.white,
  },
  subContainer: {
    ...styles.flex,
  },
  imgContainer: {
    ...styles.pr30,
  },
  image: {
    width: '50%',
    height: '50%',
    marginRight: moderateScale(50),
  },
  textContainer: {
    ...styles.mt50,
    ...styles.mh20,
  },
  btnContainer: {
    ...styles.mt100,
    ...styles.center,
  },
});
