import {FlatList, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../../components/common/GSafeAreaView';
import {styles, colors} from '../../../themes';
import GHeader from '../../../components/common/GHeader';
import {StackNav} from '../../../navigation/NavigationKeys';
import GText from '../../../components/common/GText';
import strings from '../../../i18n/strings';
import {moderateScale} from '../../../common/constants';
import moment from 'moment';
import GButton from '../../../components/common/GButton';

const CouponDetails = ({props, route}) => {
  const {CouponComponent} = route.params;
  const {item} = route.params;
  const {index} = route.params;

  const offerDetail = ({item, index}) => {
    return (
      <View style={localStyles.offerDetail}>
        <View style={localStyles.offerDetailBullet}></View>
        <GText type="m16" style={localStyles.offerDetail}>
          {item}
        </GText>
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={StackNav.CouponDetails} />
      <ScrollView style={localStyles.screen}>
        <CouponComponent item={item} index={index} />
        <GText type="m18" align="center" style={localStyles.offerText}>
          {item?.offer_percentage}
          {strings.couponOfferDetail}
        </GText>
        <FlatList
          contentContainerStyle={localStyles.flatList}
          data={item?.offer_details}
          renderItem={offerDetail}
          keyExtractor={index => index.toString()}
          scrollEnabled={false}
        />
        <GText type="m16" style={styles.mt40}>
          {strings.exp} {moment.unix(item.expiry_date).format('DD/MM/YYYY')}
        </GText>
        <GButton
          title={strings.redeemNow}
          textType={'b16'}
          containerStyle={styles.mt40}
          color={colors.white}
          bgColor={colors.green}
        />
        <GButton title={strings.termsAndCondition} textType={'m16'} />
      </ScrollView>
    </GSafeAreaView>
  );
};

export default CouponDetails;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  screen: {
    ...styles.ph20,
    ...styles.pv30,
  },
  offerText: {
    ...styles.mt40,
    ...styles.mh30,
  },
  flatList: {
    ...styles.mt30,
  },
  offerDetail: {
    ...styles.flexRow,
    ...styles.g20,
    ...styles.itemsCenter,
    ...styles.mv10,
    opacity: 0.8,
  },
  offerDetailBullet: {
    width: moderateScale(20),
    height: moderateScale(5),
    backgroundColor: colors.green,
  },
});
