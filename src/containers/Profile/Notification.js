import {
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import GText from '../../components/common/GText';

export default function Notification() {
  const [isEnabled, setIsEnabled] = useState({
    appNotification: true,
    phoneNumNotification: true,
    offerNotification: false,
  });

  const SecurityData = [
    {
      title: strings.appNotification,
      rightIcon: true,
      value: isEnabled.appNotification,
      toggleSwitch: () =>
        setIsEnabled({
          ...isEnabled,
          appNotification: isEnabled.appNotification ? false : true,
        }),
    },
    {
      title: strings.phoneNumNotification,
      rightIcon: true,
      value: isEnabled.phoneNumNotification,
      toggleSwitch: () =>
        setIsEnabled({
          ...isEnabled,
          phoneNumNotification: isEnabled.phoneNumNotification ? false : true,
        }),
    },
    {
      title: strings.offerNotification,
      rightIcon: true,
      value: isEnabled.offerNotification,
      toggleSwitch: () =>
        setIsEnabled({
          ...isEnabled,
          offerNotification: isEnabled.offerNotification ? false : true,
        }),
    },
  ];

  const MyProfileList = ({item, index}) => {
    return (
      <View style={localStyles.listComponent}>
        <View style={localStyles.detailComponent}>
          {item.icon}
          <GText type="m16" color={colors.black}>
            {item.title}
          </GText>
        </View>
        <TouchableOpacity onPress={item.toggleSwitch}>
          <Switch
            trackColor={{
              false: colors.grayScale3,
              true: colors.green,
            }}
            thumbColor={colors.white}
            onValueChange={item?.toggleSwitch}
            value={item?.value}
            style={localStyles.switch}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.notification} />
      <GKeyBoardAvoidingWrapper containerStyle={localStyles.bgContainer}>
        <View style={localStyles.container}>
          <FlatList
            data={SecurityData}
            renderItem={MyProfileList}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={localStyles.list}
          />
        </View>
      </GKeyBoardAvoidingWrapper>
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  container: {
    ...styles.ph20,
    ...styles.mv30,
    ...styles.mh20,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  bgContainer: {
    backgroundColor: colors.grayscale2,
    flex: 1,
  },
  list: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
  },
  listComponent: {
    ...styles.rowSpaceBetween,
    ...styles.itemsCenter,
    ...styles.pv15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  detailComponent: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
});
