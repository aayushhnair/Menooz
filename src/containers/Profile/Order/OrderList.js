import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { styles, colors } from '../../../themes';
import { OrderListData } from '../../../Api/constant';
import GText from '../../../components/common/GText';
import moment from 'moment';
import { moderateScale } from '../../../common/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../../navigation/NavigationKeys';
import strings from '../../../i18n/strings';
import { fetchOrderData } from '../../../Api/customerOnBoard';
import { AuthContext } from '../../../Api/Authentication';
import { Image } from 'react-native-svg';


const OrderList = () => {
  const navigation = useNavigation();
  const [orderData, setOrderData] = useState();
  const { user } = useContext(AuthContext)
  const url = "https://i.redd.it/ea4u1b85f8wa1.jpg";


  useEffect(() => {
    fetchOrderData(user.uid, (data) => {
      setOrderData(data);
    });
  }, []);



  const OrderComponent = ({ item, index }) => {
    console.log("\n\nfetch Order Data: ", item);
    return (
      <TouchableOpacity
        onPress={() => {
          navigateToOrderDetails(item);
        }}
        style={item.OrderDelivered ? localStyles.orderComponentFalse : localStyles.orderComponent}>

        <View style={localStyles.OrderContainer1}>
          <View style={localStyles.orderTextContainer}>

            <GText type="m14" color={colors.appblack}>
              {strings.orderId}{item.OrderID.substring(20)}
            </GText>
          </View>
          <View>
            <GText type="b14" color={colors.appblack}>
              {moment(item.OrderTime).format('Do MMM')}{" -"} {moment(item.OrderTime).format('hh:mm a')}
            </GText>
          </View>
        </View>
          {item.OrderDelivered ? (<View></View>) : (<View style={styles.mt10}>
            <View style={item.OrderStatus ? localStyles.orderStatustrue : localStyles.orderStatusfalse}>
            <GText type="m14" color={colors.appwhite}>
              {strings.status}{item.OrderStatus ? strings.prepared : strings.preparing}
            </GText>
          </View>
        </View>)}

      </TouchableOpacity>
    );
  };

  const navigateToOrderDetails = item => {
    navigation.navigate(StackNav.OrderDetails, { orderDetails: item });
  };

  return (
    <View style={localStyles.root}>
      <FlatList
        contentContainerStyle={styles.pv20}
        data={orderData}
        renderItem={OrderComponent}
      />
    </View>
  );
};

export default OrderList;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  OrderContainer1: {
    ...styles.rowSpaceBetween,
  },
  orderStatusfalse: {
    ...styles.flexrow,
    backgroundColor: colors.lightGreen5,
    width: '40%',
    ...styles.p10,
    borderRadius: moderateScale(10),
  },
  orderStatustrue: {
    ...styles.flexrow,
    backgroundColor: colors.green,
    width: '40%',
    ...styles.p10,
    borderRadius: moderateScale(10),
  },
  orderComponent: {
    ...styles.flex,
    backgroundColor: colors.white,
    ...styles.mh20,
    ...styles.mv10,
    ...styles.ph20,
    ...styles.pv20,
    borderRadius: 10,
    padding: 10,
  },
  orderComponentFalse: {
    ...styles.flex,
    backgroundColor: colors.grayScale5,
    ...styles.mh20,
    ...styles.mv10,
    ...styles.ph20,
    ...styles.pv20,
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
