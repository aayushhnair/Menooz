import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import {colors, styles} from '../../themes';
import {OrderEmpty, OrderFailed, OrderSuccess} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import GText from '../../components/common/GText';
import strings from '../../i18n/strings';
import GButton from '../../components/common/GButton';
import {useNavigation} from '@react-navigation/native';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';

const OrderPage = () => {
  const navigation = useNavigation();
  const [status, setStatus] = useState('success');

  const GetIcon = detail => {
    let Icon;
    let titleText;
    let descriptionText;
    switch (status) {
      case 'success':
        Icon = <OrderSuccess />;
        titleText = strings.orderSuccess;
        descriptionText = strings.orderSuccessDescription;
        break;
      case 'failed':
        Icon = <OrderFailed />;
        titleText = strings.orderFailed;
        descriptionText = strings.orderFailedDescription;
        break;

      default:
        break;
    }
    return detail == 'Icon'
      ? Icon
      : detail == 'Title'
      ? titleText
      : descriptionText;
  };

  const GetDetails = status => {
    let detail;
    switch (status) {
      case 'Icon':
        detail = GetIcon('Icon');
        break;
      case 'Title':
        detail = GetIcon('Title');
        break;
      case 'Description':
        detail = GetIcon('Description');

        break;

      default:
        break;
    }
    return detail;
  };

  const onButtonPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.TabBar}],
    });
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <View style={localStyles.mainContainer}>
        <View style={localStyles.container}>{GetDetails('Icon')}</View>
        <GText type="b26" color={colors.appwhite} style={styles.mt40}>
          {GetDetails('Title')}
        </GText>
        <GText
          type="m16"
          color={colors.labelColor}
          style={[styles.mt15, {lineHeight: moderateScale(24)}]}
          align="center">
          {GetDetails('Description')}
        </GText>
      </View>
      <GButton
        textType="b16"
        title={status == 'success' ? strings.continue : strings.tryAgain}
        bgColor={colors.appyellow}
        containerStyle={[styles.mt40, styles.mh20]}
        color={colors.appblack}
        onPress={onButtonPressed}
      />
    </GSafeAreaView>
  );
};

export default OrderPage;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.justifyCenter,
    backgroundColor: colors.appblack,
  },
  mainContainer: {
    ...styles.mh20,
    alignSelf: 'center',
  },
  container: {
    width: moderateScale(260),
    height: moderateScale(260),
    backgroundColor: colors.appyellow,
    borderRadius: moderateScale(200),
    ...styles.center,

    alignSelf: 'center',
  },
});
