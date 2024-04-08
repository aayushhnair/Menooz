import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import GSafeAreaView from '../../../components/common/GSafeAreaView';
import GHeader from '../../../components/common/GHeader';
import {StackNav} from '../../../navigation/NavigationKeys';
import {styles, colors} from '../../../themes';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {screenWidth} from '../../../common/constants';
import typography from '../../../themes/typography';
import OrderList from './OrderList';
import {OrderListData} from '../../../Api/constant';
import GText from '../../../components/common/GText';

const AllRoute = () => <OrderList />;
const RunningRoute = () => <OrderList />;
const PreviousRoute = () => <OrderList />;
const renderScene = SceneMap({
  all: AllRoute,
  running: RunningRoute,
  previous: PreviousRoute,
});
const MyOrder = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'all', title: 'All', count: OrderListData.length},
    {key: 'running', title: 'Running', count: OrderListData.length},
    {key: 'previous', title: 'Previous', count: OrderListData.length},
  ]);

  const renderTabBar = props => {
    const {navigationState, position} = props;
    return (
      <TabBar
        {...props}
        indicatorStyle={localStyles.tabBarIndicator}
        renderLabel={({route, focused, color}) => (
          <View style={localStyles.tabTitleText}>
            <GText
              type="b16"
              color={focused ? colors.green : colors.labelColor}>
              {route.title}
            </GText>
            <GText
              type="m12"
              color={focused ? colors.green : colors.labelColor}>
              ({route.count})
            </GText>
          </View>
        )}
        style={localStyles.tabBar}
      />
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={StackNav.MyOrder} style={{borderBottomWidth: 0}} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: screenWidth}}
      />
    </GSafeAreaView>
  );
};

export default MyOrder;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.grayscale2,
  },
  tabBar: {
    backgroundColor: colors.white,
  },
  tabBarTitleText: {
    ...typography.fontSizes.f16,
    ...typography.fontWeights.Bold,
  },
  tabBarIndicator: {
    backgroundColor: colors.green,
    height: 3,
    borderRadius: 3,
  },
  tabTitleText: {
    ...styles.rowCenter,
    ...styles.g5,
  },
});
