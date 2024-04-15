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
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import GSafeAreaView from '../../components/common/GSafeAreaView';
import images from '../../assets/images';
import { getWidth, moderateScale } from '../../common/constants';
import GHeader from '../../components/common/GHeader';
import { styles, colors } from '../../themes';
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
import { StackNav } from '../../navigation/NavigationKeys';
import { AuthContext } from '../../Api/Authentication';
import PopupModal from '../../components/customComponent.js/PopUp';
import { getAuth, signOut } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Profile = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState(false);


  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Navigate to login screen or a landing screen after logout
      navigation.navigate(StackNav.Login);  // Replace with your login screen route
    } catch (error) {
      setIsModalVisible(true);
      console.log('Error signing out:', error);
    }
  };

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
      title: strings.myOrder,
      icon: <MyOrder />,
      component: '',
      route: StackNav.MyOrder,
    },
    {
      id: 3,
      title: strings.notification,
      icon: <Notification />,
      component: '',
      route: StackNav.Notification,
    },
    {
      id: 4,
      title: strings.voucher,
      icon: <Voucher />,
      component: '',
      route: StackNav.Voucher,
    },
    {
      id: 5,
      title: strings.setting,
      icon: <Setting />,
      component: '',
      route: StackNav.Setting,
    },
    {
      id: 6,
      title: strings.logout,
      icon: <Logout />,
      onPress: logout,
    },
  ]);



  const navigateToComponent = navigateTo => {
    if (navigateTo) navigation.navigate(navigateTo);
  };



  const MyProfileList = ({ item, index }) => {
    if (item.onPress) {
      return (
        <TouchableOpacity
          onPress={item.onPress}
          style={localStyles.listComponent}>
          <View style={localStyles.detailComponent}>
            {item.icon}
            <GText type="m16" color={colors.appwhite}>
              {item.title}
            </GText>
          </View>
          <View>
            <ArrowNext />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => navigateToComponent(item.route)}
        style={localStyles.listComponent}>
        <View style={localStyles.detailComponent}>
          {item.icon}
          <GText type="m16" color={colors.appwhite}>
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
          <GText color={colors.appwhite} type="b18">
            {user.name ? user.name : user.email}
          </GText>
          <GText color={colors.appyellow} type="r14">
            {strings.id}<GText color={colors.appwhite} type="r14">
              {user.uid.substring(20)}
            </GText>
          </GText>
        </View>
      </View>
      <FlatList
        data={profileMenuList}
        renderItem={MyProfileList}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        style={localStyles.listStyles}
        contentContainerStyle={localStyles.list}
      />
      {isModalVisible && (
        <PopupModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} stringToShow={strings.errorLogOut} />
      )}
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

  MyComponent: {
    ...styles.g10,
    ...styles.center,
  },
  listStyles: {
    ...styles.mt25,
  },
  list: {

    borderRadius: moderateScale(15),
    ...styles.mh20,
    ...styles.mt30,
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
