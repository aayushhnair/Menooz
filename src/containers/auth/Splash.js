// Library Imports
import {Animated, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {CartGreen, Logo} from '../../assets/svgs';
import GText from '../../components/common/GText';
import strings from '../../i18n/strings';
import { AuthContext } from '../../Api/Authentication';

const Splash = ({navigation}) => {
  const {accessToken} = useContext(AuthContext)
  const [scale, setScale] = useState(new Animated.Value(0))
  const asyncProcess = async () => {
    try {
        if (!!accessToken) {
          navigation.reset({
            index: 0,
            routes: [{name: StackNav.TabBar}],
          });
        } else {
          navigation.navigate(StackNav.Login)
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
            <Logo />
          </View>
        </View>
        <View style={localStyles.textContainer}>
          <View style={localStyles.textGroup}>
            <GText type="b42" color={colors.appyellow}>
              {strings.app_name}
            </GText>
          </View>
          <GText type="m20" color={colors.appwhite}>
            {strings.your_daily_needs}
          </GText>
        </View>
      </View>
    </View>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    ...styles.flexCenter,
    backgroundColor: colors.appblack,
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

});
