import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles, colors} from '../../../themes';
import {OrderListData} from '../../../Api/constant';
import GText from '../../../components/common/GText';
import moment from 'moment';
import {moderateScale} from '../../../common/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../../navigation/NavigationKeys';
import strings from '../../../i18n/strings';

const OrderList = () => {
  const navigation = useNavigation();

  const getStep = order_status => {
    switch (order_status) {
      case 'Confirmed':
        return {step: 1, color: colors.orderConfirmed, left: 0};
      case 'Processing':
        return {step: 2, color: colors.green, left: '25%'};
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

  const Step = ({order_status, stepNumber, style}) => {
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

  const OrderStatus = ({item, index}) => {
    return (
      <View style={[styles.flexRow, styles.itemsCenter]}>
        <Step
          order_status={item.order_status}
          stepNumber={1}
          style={localStyles.stepRound}
        />
        <Step
          order_status={item.order_status}
          stepNumber={2}
          style={localStyles.statusBar}
        />
        <Step
          order_status={item.order_status}
          stepNumber={2}
          style={localStyles.stepRound}
        />
        <Step
          order_status={item.order_status}
          stepNumber={3}
          style={localStyles.statusBar}
        />
        <Step
          order_status={item.order_status}
          stepNumber={3}
          style={localStyles.stepRound}
        />
        <Step
          order_status={item.order_status}
          stepNumber={4}
          style={localStyles.statusBar}
        />
        <Step
          order_status={item.order_status}
          stepNumber={4}
          style={localStyles.stepRound}
        />
        <GText
          type="m14"
          color={getStep(item.order_status)?.color}
          style={{
            position: 'absolute',
            top: 20,
            left: getStep(item.order_status)?.left,
          }}>
          {item.order_status}
        </GText>
      </View>
    );
  };

  const OrderComponent = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateToOrderDetails(item);
        }}
        style={localStyles.orderComponent}>
        <View style={localStyles.OrderContainer1}>
          <View style={localStyles.orderTextContainer}>
            <GText type="m14" color={colors.labelColor}>
              {strings.orderId}:
            </GText>
            <GText type="m14">{item.order_id}</GText>
          </View>
          <View>
            <GText type="m14" color={colors.labelColor}>
              {moment.unix(item.order_date).format('Do MMM YY')}
            </GText>
          </View>
        </View>
        <View style={localStyles.statusContainer}>
          <View style={{flex: 1.5}}>
            <GText type="m14" color={colors.labelColor}>
              {strings.orderStatus}:
            </GText>
          </View>
          <View style={[{flex: 7.5}]}>
            <OrderStatus item={item} index={index} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const navigateToOrderDetails = item => {
    navigation.navigate(StackNav.OrderDetails, {orderDetails: item});
  };

  return (
    <View style={localStyles.root}>
      <FlatList
        contentContainerStyle={styles.pv20}
        data={OrderListData}
        renderItem={OrderComponent}
      />
    </View>
  );
};

export default OrderList;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.grayscale2,
  },
  OrderContainer1: {
    ...styles.rowSpaceBetween,
  },
  orderComponent: {
    ...styles.flex,
    backgroundColor: colors.white,
    ...styles.mh20,
    ...styles.mv10,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.pb40,
    borderRadius: 10,
    padding: 10,
  },
  orderTextContainer: {
    ...styles.flexRow,
    ...styles.g5,
  },
  statusContainer: {
    ...styles.flex,
    ...styles.rowSpaceBetween,
    ...styles.mt10,
  },
  statusBar: {
    height: moderateScale(4),
    width: '28%',
    backgroundColor: colors.shadow2,
  },
  stepRound: {
    height: moderateScale(14),
    width: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: colors.shadow2,
  },
});
