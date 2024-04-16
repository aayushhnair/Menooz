import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import GSafeAreaView from '../../../components/common/GSafeAreaView';
import {colors, styles} from '../../../themes';
import GHeader from '../../../components/common/GHeader';
import {StackNav} from '../../../navigation/NavigationKeys';
import {CouponList} from '../../../Api/constant';
import {getHeight, getWidth, moderateScale} from '../../../common/constants';
import images from '../../../assets/images';
import {screenWidth} from '../../../common/constants';
import GButton from '../../../components/common/GButton';
import GText from '../../../components/common/GText';
import strings from '../../../i18n/strings';
import {useNavigation} from '@react-navigation/native';

const OfferAndPromos = () => {
  const navigation = useNavigation();
  const coupon_width = '100%';
  const coupon_height = moderateScale(172);
  const getBackground = index => {
    switch (index % 4) {
      case 0:
        return images.offer1;
      case 1:
        return images.offer2;
      case 2:
        return images.offer3;
      case 3:
        return images.offer4;
      default:
        return null;
    }
  };

  const CouponComponent = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(StackNav.CouponDetails, {
            item,
            index,
            CouponComponent,
          })
        }>
        <ImageBackground
          source={getBackground(index)}
          resizeMode="contain"
          style={{
            width: coupon_width,
            height: coupon_height,
            // ...styles.center,
          }}>
          <View style={localStyles.container}>
            <View style={[{flex: 3.8}, styles.center]}>
              <GText type="b46" color={colors.white}>
                {item.offer_percentage}%
              </GText>
              <GText type="m30" color={colors.white}>
                {strings.off}
              </GText>
            </View>
            <View style={{flex: 6.2}}>
              <View style={[localStyles.container3, styles.itemsEnd]}>
                <GButton
                  color={colors.green}
                  bgColor={colors.white}
                  textType="b12"
                  containerStyle={localStyles.btnContainer}
                  title={strings.collect}></GButton>
              </View>
              <View style={[localStyles.container3, styles.itemStart]}>
                <GText type="b26" color={colors.white}>
                  {item.product_name}
                </GText>
              </View>
              <View style={[localStyles.container3, styles.itemsEnd]}>
                <GText type="m12" color={colors.white}>
                  {strings.exp}-
                  {moment.unix(item.expiry_date).format('DD/MM/YYYY')}
                </GText>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={StackNav.OfferAndPromos} />
      {/* <FlatList
        data={CouponList}
        contentContainerStyle={localStyles.CouponList}
        renderItem={CouponComponent}
        keyExtractor={(item, index) => index.toString()}
      /> */}
    </GSafeAreaView>
  );
};

export default OfferAndPromos;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  CouponList: {
    paddingHorizontal: '5%',
    ...styles.pv30,
  },
  container: {
    ...styles.flex,
    ...styles.flexRow,
  },
  container3: {
    flex: 1,
    ...styles.justifyCenter,
    ...styles.ph10,
  },
  btnContainer: {
    ...styles.ph25,
    ...styles.pv10,
    borderRadius: moderateScale(40),
  },
});
