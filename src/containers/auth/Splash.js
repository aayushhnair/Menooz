// Library Imports
import {Animated, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local Imports
import {colors, styles} from '../../themes';
import {StackNav} from '../../navigation/NavigationKeys';
import {
  ACCESS_TOKEN,
  APP_OPEN_FIRST_TIME,
  THEME,
  getHeight,
  getWidth,
  moderateScale,
} from '../../common/constants';
import {CartGreen} from '../../assets/svgs';
import GText from '../../components/common/GText';
import strings from '../../i18n/strings';

const Splash = ({navigation}) => {
  const [scale, setScale] = useState(new Animated.Value(0));

  const asyncProcess = async () => {
    try {
      let asyncData = await AsyncStorage.multiGet([
        THEME,
        APP_OPEN_FIRST_TIME,
        ACCESS_TOKEN,
      ]);
      if (!!asyncData) {
        console.log('asyncData ', asyncData);
        const appOpenFirstTime = JSON.parse(asyncData[1][1]);
        const access_token = JSON.parse(asyncData[2][1]);
        if (!!access_token) {
          navigation.reset({
            index: 0,
            routes: [{name: StackNav.TabBar}],
          });
        } else {
          if (!!appOpenFirstTime) {
            navigation.reset({
              index: 0,
              routes: [{name: StackNav.Auth}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: StackNav.OnBoarding}],
            });
          }
        }
      }
    } catch (e) {
      console.log('error ', e);
    }
  };
  useEffect(() => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        asyncProcess();
      }, 500);
    });
  }, []);

  return (
    <View style={localStyles.container}>
      <View style={[localStyles.subContainer]}>
        <View style={{flex: 0.5, alignItems: 'flex-end'}}>
          <View style={localStyles.iconWrapper}>
            <CartGreen />
          </View>
        </View>
        <View style={localStyles.textContainer}>
          <View style={localStyles.textGroup}>
            <GText type="b42" color={colors.green}>
              {strings.app_start_name}
            </GText>
            <GText type="b42" color={colors.grey}>
              {strings.app_name}
            </GText>
          </View>
          <GText type="m20" color={colors.textColor}>
            {strings.your_daily_needs}
          </GText>
        </View>
      </View>
      <Animated.View
        style={[
          localStyles.animatedView,
          {
            transform: [
              {
                scale: scale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [9, 0.1],
                }),
              },
            ],
          },
        ]}></Animated.View>
    </View>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    ...styles.flexCenter,
    backgroundColor: colors.white,
  },
  subContainer: {
    ...styles.flex,
    ...styles.rowCenter,
    zIndex: 2,
  },
  textGroup: {
    ...styles.flexRow,
  },
  textContainer: {
    ...styles.flex,
    ...styles.justifyBetween,
    ...styles.flexColumn,
    ...styles.ml20,
    marginTop: -10,
  },
  iconWrapper: {
    ...styles.z1,
  },
  animatedView: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    backgroundColor: colors.lightGreen,
    position: 'absolute',
    right: getWidth(182),
    top: getHeight(327),
    zIndex: 1,
  },
});
