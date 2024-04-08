import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {
  AddIcon,
  ApplePayment,
  CashIcon,
  CreditCard,
  PayPal,
} from '../../assets/svgs';
import GText from '../../components/common/GText';
import {moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';

export default function Payment({navigation}) {
  const iconStyle = moderateScale(38);

  const onPressAdd = () => navigation.navigate(StackNav.AddNewCard);

  const RenderOtherPaymentOption = ({icon, title, desc}) => {
    return (
      <View style={localStyles.otherPaymentContainer}>
        <View style={localStyles.iconContainer}>{icon}</View>
        <View style={styles.ml20}>
          <GText type="b16" color={colors.black}>
            {title}
          </GText>
          <GText type="m16" style={styles.mt5} color={colors.black}>
            {desc}
          </GText>
        </View>
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.paymentOption} />
      <View style={localStyles.container}>
        <GText type="b16" color={colors.black}>
          {strings.myCard}
        </GText>
        <TouchableOpacity onPress={onPressAdd}>
          <AddIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.selfCenter}>
        <CreditCard />
      </View>
      <GText type="b16" style={[styles.mt30, styles.mh20]} color={colors.black}>
        {strings.otherPaymentOption}
      </GText>
      <RenderOtherPaymentOption
        icon={<PayPal height={iconStyle} width={iconStyle} />}
        title="PayPal"
        desc="Mypaypal@gmail.com"
      />
      <RenderOtherPaymentOption
        icon={<CashIcon height={iconStyle} width={iconStyle} />}
        title="Cash On Delivery"
        desc="Pay In Cash"
      />
      <RenderOtherPaymentOption
        icon={<ApplePayment height={iconStyle} width={iconStyle} />}
        title="Apple Pay"
        desc="applepay.com"
      />
    </GSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
  },
  otherPaymentContainer: {
    borderWidth: moderateScale(1),
    borderColor: colors.lightGray,
    borderRadius: moderateScale(10),
    ...styles.mt20,
    ...styles.mh20,
    ...styles.p15,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  iconContainer: {
    backgroundColor: colors.shadow2,
    ...styles.pv10,
    ...styles.ph15,
    borderRadius: moderateScale(10),
  },
});
