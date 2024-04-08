import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import GSafeAreaView from '../../../components/common/GSafeAreaView';
import {styles, colors} from '../../../themes';
import GHeader from '../../../components/common/GHeader';
import {StackNav} from '../../../navigation/NavigationKeys';
import {moderateScale} from '../../../common/constants';
import GText from '../../../components/common/GText';
import strings from '../../../i18n/strings';
import {Confirmed, Delivered, Processing, Shipped} from '../../../assets/svgs';
import moment from 'moment';
import {getTotalByKey} from '../../../utils/helpers';

const OrderDetails = ({props, route}) => {
  const [orderSteps, setOrderSteps] = useState([
    {
      step: 1,
      color: colors.orderConfirmed,
      title: 'Order Confirmed',
      icon: <Confirmed />,
      dateKey: 'order_confirmed_date',
    },
    {
      step: 2,
      color: colors.green,
      title: 'Order Processing',
      icon: <Processing />,
      dateKey: 'order_processing_date',
    },
    {
      step: 3,
      color: colors.orderShipped,
      title: 'Order Shipped',
      icon: <Shipped />,
      dateKey: 'order_shipped_date',
    },
    {
      step: 4,
      color: colors.green,
      title: 'Order Delivered',
      icon: <Delivered />,
      dateKey: 'order_delivered_date',
    },
    // {
    //   step: 5,
    //   color: colors.orderCancelled,
    //   title: 'Canceled',
    // },
  ]);
  const orderDetails = route?.params?.orderDetails;

  const getStep = order_status => {
    switch (order_status) {
      case 'Confirmed':
        return {step: 1, color: colors.orderConfirmed};
      case 'Processing':
        return {step: 2, color: colors.green};
      case 'Shipped':
        return {step: 3, color: colors.orderShipped, left: '59%'};
      case 'Delivered':
        return {step: 4, color: colors.green, left: '81%'};
      case 'Canceled':
        return {step: 5, color: colors.orderCancelled, left: '81%'};
      default:
        return {step: 0, color: colors.shadow2};
    }
  };

  const Step = ({stepNumber, style}) => {
    return (
      <View
        style={[
          style,
          {
            backgroundColor:
              getStep(orderDetails?.order_status)?.step >= stepNumber
                ? getStep(orderDetails?.order_status)?.color
                : colors.shadow2,
          },
        ]}
      />
    );
  };

  const renderOrderSteps = ({item, index}) => {
    return (
      <View style={localStyles.container}>
        <View
          style={{
            top:
              index == orderSteps?.length - 1
                ? -moderateScale(20)
                : index != 0
                ? -moderateScale(10)
                : 0,
          }}>
          {item?.icon}
        </View>
        <View style={[styles.itemsCenter]}>
          <Step style={localStyles.stepRound} stepNumber={item?.step} />
          {index != orderSteps?.length - 1 && (
            <Step style={localStyles.statusBar} stepNumber={item?.step + 1} />
          )}
        </View>
        <View style={[styles.g5, {top: index != 0 ? -moderateScale(15) : 0}]}>
          <GText type="m16">{item?.title}</GText>
          <View style={[styles.rowSpaceBetween]}>
            <GText type="m14" color={colors.labelColor}>
              {orderDetails[item?.dateKey] &&
                moment.unix(orderDetails[item.dateKey]).format('DD.MM.YYYY')}
            </GText>
            <GText type="m14" color={colors.labelColor} style={styles.ml80}>
              {orderDetails[item?.dateKey] &&
                moment.unix(orderDetails[item.dateKey]).format('LT')}
            </GText>
          </View>
        </View>
      </View>
    );
  };

  const PaymentDetail = ({title, value}) => {
    return (
      <View style={styles.rowSpaceBetween}>
        <GText type="b16">{strings.paidFrom}</GText>
        <GText type="b16">{orderDetails?.paymentMethod}</GText>
      </View>
    );
  };

  const renderProduct = ({item, index}) => {
    return (
      <View style={localStyles.productContainer}>
        <View style={localStyles.productContainer1}>
          <Image
            resizeMode="contain"
            source={item.imageLink}
            style={localStyles.img}
          />
          <View style={localStyles.title}>
            <GText type="m16">{item.productName}</GText>
            <GText type="m16" color={colors.labelColor}>
              {item.wight} {strings.kg}
            </GText>
          </View>
        </View>
        <View style={[localStyles.price]}>
          <GText type="m20">
            {strings.$}
            {item.revisedPrice}
          </GText>
          <GText type="m16" color={colors.labelColor}>
            5x
          </GText>
        </View>
      </View>
    );
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={StackNav.OrderDetails} />
      <ScrollView
        bounces={false}
        style={localStyles.orderDetailContainer}
        showsVerticalScrollIndicator={false}>
        <GText type="b16" style={styles.mt30}>
          {strings.orderId} #{orderDetails?.order_id}
        </GText>
        <View style={localStyles.orderTrackContainer}>
          {orderSteps && (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={orderSteps}
              renderItem={renderOrderSteps}
              scrollEnabled={false}
            />
          )}
          <View style={localStyles.productDetail}>
            <GText type="b16">{strings.productDetailHeader}</GText>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={orderDetails?.productDetail}
              renderItem={renderProduct}
              scrollEnabled={false}
            />
          </View>
          <View style={localStyles.paymentDetails}>
            <PaymentDetail
              title={strings.paidFrom}
              value={orderDetails?.paymentMethod}
            />
            <View style={styles.rowSpaceBetween}>
              <GText type="b16">{strings.totalPrice}</GText>
              <GText type="b16">
                {strings.$}
                {getTotalByKey(orderDetails?.productDetail, 'revisedPrice')}
              </GText>
            </View>
          </View>
        </View>
      </ScrollView>
    </GSafeAreaView>
  );
};

export default OrderDetails;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.grayscale2,
  },
  orderDetailContainer: {
    backgroundColor: colors.white,
    ...styles.mh15,
    ...styles.mv30,
    ...styles.ph20,
    borderRadius: moderateScale(20),
  },
  orderTrackContainer: {
    backgroundColor: colors.white,
    ...styles.mt30,
  },
  statusBar: {
    width: moderateScale(4),
    height: moderateScale(100),
    backgroundColor: colors.shadow2,
  },
  container: {
    ...styles.flexRow,
    ...styles.ph20,
    ...styles.g25,
  },
  stepRound: {
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: colors.shadow2,
  },
  productDetail: {
    ...styles.mt30,
  },
  productContainer: {
    ...styles.rowSpaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: colors.shadow2,
    ...styles.pv5,
  },
  img: {
    width: 100,
    height: 100,
  },
  productContainer1: {
    ...styles.flexRow,
    ...styles.selfCenter,
  },
  title: {
    ...styles.g5,
    ...styles.ml20,
    ...styles.mt20,
  },
  price: {
    ...styles.g20,
    ...styles.ml20,
    // ...styles.mt20,
  },
  paymentDetails: {
    ...styles.mt30,
    ...styles.pv20,
    ...styles.g20,
  },
});
