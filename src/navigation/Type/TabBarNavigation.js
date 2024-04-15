// Library import
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';

// Local import
import {StackRoute, TabRoute} from '../NavigationRoutes';
import {StackNav, TabNav} from '../NavigationKeys';
import {getHeight, moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import {

  Cart_2,
  Home,
  Home_Selected,

  Profile,
  Profile_Selected,

} from '../../assets/svgs';
import {colors, styles} from '../../themes';
import GText from '../../components/common/GText';
import {checkPlatform} from '../../utils/helpers';
import GSafeAreaView from '../../components/common/GSafeAreaView';

export default function TabBarNavigation({navigation}) {
  const Tab = createBottomTabNavigator();

  const TabText = ({text, routeName, selectedTab, style}) => {
    let icon;
    switch (routeName) {
      case TabNav.Home:
        icon = routeName == selectedTab ? <Home_Selected /> : <Home />;
        break;
      case TabNav.Profile:
        icon = routeName == selectedTab ? <Profile_Selected /> : <Profile />;
        break;
      case StackNav.MyOrder:
        icon = <Cart_2 fill = {colors.appwhite}/>;
        break;
    }
    return (
      <View style={[localStyles.tabViewContainer, style]}>
        {icon}
        {!!text && (
          <GText
            type={'m14'}
            numberOfLines={1}
            style={styles.mt5}
            color={routeName == selectedTab ? colors.appyellow : colors.grayScale5}>
            {routeName}
          </GText>
        )}
      </View>
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (routeName == StackNav.Cart) {
            navigation.navigate(StackNav.Cart);
          } else {
            navigate('routeName', routeName);
          }
        }}>
        <TabText
          text={strings.save}
          routeName={routeName}
          selectedTab={selectedTab}
        />
      </TouchableOpacity>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <CurvedBottomBar.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        height={checkPlatform() === 'ios' ? getHeight(80) : getHeight(80)}
        circleWidth={moderateScale(60)}
        circlePosition="CENTER"
        type="DOWN"
        shadowStyle={localStyles.shadow}
        renderCircle={({selectedTab, navigate}) => (
          <TouchableOpacity onPress={() => navigation.navigate(StackNav.MyOrder)}>
            <Animated.View style={localStyles.btnCircleUp}>
              <TabText
                style={localStyles.cartButton}
                routeName={StackNav.MyOrder}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
        bgColor={colors.appblack}
        tabBar={renderTabBar}
        initialRouteName={TabNav.Home}>
        <Tab.Screen
          position="LEFT"
          name={TabNav.Home}
          component={TabRoute.Home}
        />
        <Tab.Screen
          position="CIRCLE"
          name={TabNav.Save}
          component={TabRoute.Save}
        />
        <Tab.Screen
          position="RIGHT"
          name={TabNav.Profile}
          component={TabRoute.Profile}
        />
      </CurvedBottomBar.Navigator>
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  tabViewContainer: {
    ...styles.center,
  },
  cartButton: {},
  shadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  btnCircleUp: {
    bottom: moderateScale(30),
    backgroundColor: colors.appyellow,
    borderRadius: moderateScale(33),
    width: moderateScale(65),
    height: moderateScale(65),
    ...styles.center,
  },
});
