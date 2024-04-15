import {
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  View,
  Text, 
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import GSafeAreaView from '../../components/common/GSafeAreaView';
import images from '../../assets/images';
import {getWidth, moderateScale} from '../../common/constants';
import GHeader from '../../components/common/GHeader';
import {styles, colors} from '../../themes';
import GText from '../../components/common/GText';
import {
  ArrowNext,
  Logout,
  MyAddress,
  MyOrder,
  MyProfile,
  Notification,
  Payment,
  Setting,
  Voucher,
} from '../../assets/svgs';
import strings from '../../i18n/strings';
import {StackNav} from '../../navigation/NavigationKeys';
import { AuthContext } from '../../Api/Authentication';



const Profile = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext)
  const [profileMenuList, setProfileMenuList] = useState([
    {
      id: 1,
      title: strings.myProfile,
      icon: <MyProfile />,
      component: '',
      route: StackNav.EditProfile,
    },
    {
      id: 2,
      title: strings.notification,
      icon: <Notification />,
      component: '',
      route: StackNav.Notification,
    },
    {
      id: 3,
      title: strings.setting,
      icon: <Setting />,
      component: '',
      route: StackNav.Setting,
    },
    {
      id: 4,
      title: strings.Payment,
      icon: <Payment />,
      component: '',
      route: StackNav.Payment,
    },
    {
      id: 5,
      title: strings.logout,
      icon: <Logout />,
      component: '',
    },
  ]);

  const navigateToComponent = navigateTo => {
    if (navigateTo) navigation.navigate(navigateTo);
  };

  const MyComponent = ({icon, title, navigateTo}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateToComponent(navigateTo);
        }}
        style={localStyles.MyComponent}>
        {icon}
        <GText type="m14" color={colors.black}>
          {title}
        </GText>
      </TouchableOpacity>
    );
  };

  const MyProfileList = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToComponent(item.route)}
        style={localStyles.listComponent}>
        <View style={localStyles.detailComponent}>
          {item.icon}
          <GText type="m16" color={colors.black}>
            {item.title}
          </GText>
        </View>
        <View>
          <ArrowNext />
        </View>
      </TouchableOpacity>
    );
  };



  return (
    <GSafeAreaView style={localStyles.root}>
        <GHeader
          headerTitle="Profile"
          isBackWhite={true}
          titleColor={colors.white}
          style={localStyles.header}
        />
        <View style={localStyles.profileContainer}>
          <Image source={images.noProfile} style={localStyles.profileImage} />
          <View style={localStyles.profileDetail}>
            <GText color={colors.white} type="b18">
              {user.email}
            </GText>
            <GText color={colors.white} type="r14">
              {strings.id}{user.uid.substring(20)}
            </GText>
          </View>
        </View>
        <View style={localStyles.container}>
          <MyComponent
            icon={<MyOrder />}
            title={strings.myOrder}
            navigateTo={StackNav.MyOrder}
          />
          <MyComponent
            icon={<Voucher />}
            title={strings.voucher}
            navigateTo={StackNav.OfferAndPromos}
          />
          <MyComponent
            icon={<MyAddress />}
            title={strings.myAddress}
            navigateTo={StackNav.DeliveryAddress}
          />
        </View>
        <FlatList
          data={profileMenuList}
          renderItem={MyProfileList}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          style={localStyles.listStyles}
          contentContainerStyle={localStyles.list}
        />
    </GSafeAreaView>
  );
};

export default Profile;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  profileContainer: {
    ...styles.mt35,
    ...styles.itemsCenter,
    ...styles.g15,
    ...styles.mh30,
  },
  profileImage: {
    width: getWidth(90),
    height: getWidth(90),
    borderRadius: getWidth(50),
    backgroundColor: colors.profileBg,
  },
  profileDetail: {
    ...styles.center,
    ...styles.g10,
  },
  container: {
    ...styles.rowSpaceBetween,
    backgroundColor: colors.white,
    ...styles.mh20,
    ...styles.mt35,
    ...styles.pv30,
    ...styles.ph30,
    borderRadius: moderateScale(15),
  },
  MyComponent: {
    ...styles.g10,
    ...styles.center,
  },
  listStyles: {
    ...styles.mt25,
  },
  list: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    ...styles.mh20,
  },
  listComponent: {
    ...styles.rowSpaceBetween,
    ...styles.itemsCenter,
    ...styles.mh20,
    ...styles.pv15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  detailComponent: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.g20,
  },
});
