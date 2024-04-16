import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

// local imports
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import GKeyBoardAvoidingWrapper from '../../components/common/GKeyBoardAvoidingWrapper';
import GText from '../../components/common/GText';
import {ArrowNext} from '../../assets/svgs';
import {settingData} from '../../Api/constant';

export default function Setting() {
  const navigation = useNavigation();

  const navigateToComponent = navigateTo => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  const MyProfileList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToComponent(item?.route)}
        style={localStyles.listComponent}>
        <View style={localStyles.detailComponent}>
          {item.icon}
          <GText type="m16" color={colors.black}>
            {item.title}
          </GText>
        </View>
        <ArrowNext />
      </TouchableOpacity>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.setting} />
      <GKeyBoardAvoidingWrapper containerStyle={localStyles.bgContainer}>
        {/* <View style={localStyles.container}>
          <FlatList
            data={settingData}
            renderItem={MyProfileList}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            style={localStyles.listStyles}
            contentContainerStyle={localStyles.list}
          />
        </View> */}
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
    backgroundColor: colors.appblack,
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
});
