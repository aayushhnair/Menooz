import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import GSafeAreaView from '../../../components/common/GSafeAreaView';
import { styles, colors } from '../../../themes';
import GHeader from '../../../components/common/GHeader';
import { StackNav } from '../../../navigation/NavigationKeys';
import { moderateScale } from '../../../common/constants';
import GText from '../../../components/common/GText';
import strings from '../../../i18n/strings';
import { Confirmed, Delivered, Processing, Shipped } from '../../../assets/svgs';
import moment from 'moment';
import { getTotalByKey, getTotalOfMultiplyByKey } from '../../../utils/helpers';


const OrderDetails = ({ props, route }) => {
  const [singleOrder, setSingleOrder] = useState();
  const [order_status, setOrder_status] = useState('')

  
  const orderDetails = route?.params?.orderDetails;
  // setSingleOrder(orderDetails.OrderInfo)


  
  const [orderSteps, setOrderSteps] = useState([
    {
      step: 1,
      color: colors.green,
      title: 'Order Processing',
      icon: <Processing />,
      dateKey: 'order_processing_date',
    },
    {
      step: 2,
      color: colors.orderConfirmed,
      title: 'Order Confirmed',
      icon: <Confirmed />,
      dateKey: 'order_confirmed_date',
    },

    {
      step: 3,
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

  const url = "https://i.redd.it/ea4u1b85f8wa1.jpg";


 

  const getStep = order_status => {
    
    switch (order_status) {
      case 'Confirmed':
        return { step: 2, color: colors.orderConfirmed };
      case 'Processing':
        return { step: 1, color: colors.green };
      case 'Delivered':
        return { step: 3, color: colors.green, left: '81%' };
      case 'Canceled':
        return { step: 5, color: colors.orderCancelled, left: '81%' };
      default:
        return { step: 0, color: colors.shadow2 };
    }
  };
  const Step = ({ stepNumber, style }) => {
    return (
      <View
        style={[
          style,
          {
            backgroundColor:
              getStep(order_status)?.step >= stepNumber
                ? getStep(order_status)?.color
                : colors.shadow2,
          },
        ]}
      />
    );
  };


  const renderOrderSteps = ({ item, index }) => {
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
        <View style={[styles.g5, { top: index != 0 ? -moderateScale(15) : 0 }]}>
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

  const PaymentDetail = ({ title, value }) => {
    return (
      <View style={styles.rowSpaceBetween}>
        <GText type="b16">{strings.paidFrom}</GText>
        <GText type="b16">{"Google Pay"}</GText>
      </View>
    );
  };

  const renderProduct = ({ item, index }) => {

    if (orderDetails.OrderStatus) {
      setOrder_status('Confirmed');
    } else if (orderDetails.OrderDelivered) {
      setOrder_status('Delivered');
    } else {
      setOrder_status('Processing');
    }
    console.log(item)
    return (
      <View style={localStyles.productContainer}>
        <View style={localStyles.productContainer1}>
          <Image
            resizeMode="contain"
            source={{uri : url}}
            style={localStyles.img}
          />
          <View style={localStyles.title}>
            <GText type="m16">{item.name}</GText>
            <GText type="m16" color={colors.labelColor}>
            {"Quantity: "} {item.quantity} 
            </GText>
          </View>
        </View>
        <View style={[localStyles.price]}>
          <GText type="m20">
            {strings.$}
            {item.price}
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
          {strings.orderId} #{orderDetails?.OrderID.substring(20)}
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
              data={orderDetails?.OrderInfo || []} // Accessing OrderInfo correctly and providing a default empty array
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
                {getTotalOfMultiplyByKey(orderDetails?.OrderInfo, 'price', 'quantity')}
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
    backgroundColor: colors.appblack,
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
