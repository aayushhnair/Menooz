import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {getWidth, moderateScale} from '../../common/constants';
import GText from '../../components/common/GText';
import {Delete, EmptyCart, MinusGreen, PlusGreen} from '../../assets/svgs';
import GButton from '../../components/common/GButton';
import {
  getDeviceType,
  getTotalByKey,
  getTotalOfMultiplyByKey,
} from '../../utils/helpers';
import EmptyListComponent from '../../components/customComponent.js/EmptyListComponent';
import GInput from '../../components/common/GInput';
import {StackNav} from '../../navigation/NavigationKeys';
import { restaurent } from '../../Api/constant';

const Cart = ({route, navigation}) => {
  const [cartList, setCartList] = useState(global.cart);
  const [refreshing, setRefreshing] = useState(false);
  const [coupon, setCoupon] = useState('');
  const restaurantID = route?.params.restaurantID;
  const restaurantName = route?.params.restaurantName;

  

  useEffect(() => {
    setCartList(global.cart);
  }, [global.cart]);
 
  const refresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const increaseQuantity = index => {
    let temp = global.cart;
    temp[index].quantity = temp[index].quantity + 1;
    setCartList([...temp]);
    global.cart = temp;
  };

  const decreaseQuantity = index => {
    let temp = global.cart;
    if (temp[index].quantity == 1) return;
    temp[index].quantity = temp[index].quantity - 1;
    setCartList([...temp]);
    global.cart = temp;
  };

  const navigateToCheckOut = () => {
    navigation.navigate(StackNav.CheckOut, {
      restaurantID: restaurantID,
      restaurantName: restaurantName,
    });
  };

  const deleteItem = index => {
    let temp = global.cart;
    temp.splice(index, 1);
    setCartList([...temp]);
    global.cart = temp;
  };


  


  const cartItem = ({item, index}) => {
    defaultimageurl = "https://i.redd.it/ea4u1b85f8wa1.jpg";
    return (
      <View style={localStyles.item}>
        <View style={styles.flexRow}>
        {item.imageUrl != "" ? (
          <Image
            source={{ uri: item.imageUrl }}
            resizeMode="contain"
            style={{width: moderateScale(80), height: moderateScale(80), borderRadius: moderateScale(15)}}
          />
        ) : (
          <Image
            source={{ uri: defaultimageurl }}
            resizeMode="contain"
            style={{width: moderateScale(80), height: moderateScale(80), borderRadius: moderateScale(15)}}
          />
        )}
          <View style={styles.ml20}>
            <GText type="m16" color={colors.appblack}>
              {item.name}
            </GText>
            <GText type="m14" color={colors.appblack} style={styles.mt5}>
              {strings.$}{item.price}
            </GText>
            <View style={[styles.flexRow, styles.mt10]}>
              <GButton
                onPress={() => decreaseQuantity(index)}
                icon={<MinusGreen />}
                bgColor={'transparent'}
                containerStyle={localStyles.btn}
              />
              <GText
                type="m20"
                color={colors.appblack}
                align="center"
                style={{...styles.mh20, ...styles.selfCenter}}>
                {item.quantity}
              </GText>
              <GButton
                onPress={() => increaseQuantity(index)}
                icon={<PlusGreen />}
                bgColor={'transparent'}
                containerStyle={localStyles.btn}
              />
            </View>
          </View>
        </View>
        <View style={localStyles.container}>
          <GButton
            onPress={() => deleteItem(index)}
            icon={<Delete />}
            containerStyle={{height: moderateScale(0)}}
          />
          <GText type="m20" color={colors.appblack} style={styles.mt15}>
            {strings.$}
            {item.price}
          </GText>
        </View>
      </View>
    );
  };

  const applyBtnPress = () => {};

  const onCouponChange = val => {
    setCoupon(val);
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const Details = ({label, data}) => {
    return (
      <View style={styles.mt15}>
        <View style={styles.rowSpaceBetween}>
          <GText type="m16" color={colors.appwhite}>
            {label}
          </GText>

          <GText type="b16" color={colors.appwhite}>
            {data}
          </GText>
        </View>
      </View>
    );
  };

  const ListEmptyComponent = ({item, index}) => {
    return (
      <>
        <EmptyListComponent
          title={strings.yourCartIsEmpty}
          description={strings.yourCartIsEmptyDescription}
          btnTitle={strings.startAdding}
          onPress={navigateToHome}
        />
      </>
    );
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.cartHeader} />
      <FlatList
        contentContainerStyle={
          cartList.length == 0 && [styles.flexGrow1, styles.justifyCenter]
        }
        keyExtractor={(item, index) => index.toString()}
        style={localStyles.listStyle}
        data={cartList}
        renderItem={cartItem}
        showsVerticalScrollIndicator={false}
        onRefresh={refresh}
        refreshing={refreshing}
        ListEmptyComponent={
          <ListEmptyComponent
            title={strings.yourCartIsEmpty}
            description={strings.yourCartIsEmptyDescription}
            btnTitle={strings.startAdding}
            onPress={navigateToHome}
          />
        }
      />
      {cartList.length > 0 && (
        <View style={localStyles.container2}>
          <GText color = {colors.appwhite} type={'b16'}>{strings.AddCoupon}</GText>
          <View style={localStyles.couponContainer}>
            <GInput
              value={coupon}
              toGetTextFieldValue={onCouponChange}
              style={localStyles.couponInput}
              inputStyle={localStyles.couponInputStyle}
              placeholder={strings.enterCouponCode}
              innerInputStyle={
                getDeviceType() == 2 ? {...styles.p15} : {...styles.p10}
              }
            />
            <GButton
              title={strings.apply}
              textType="b16"
              color={colors.labelColor}
              bgColor={colors.shadow2}
              containerStyle={[
                localStyles.applyBtn,
                {borderRadius: moderateScale(7)},
              ]}
              onPress={applyBtnPress}
            />
          </View>
          <View
            style={{
              ...styles.pb15,
              borderBottomWidth: 1,
              borderColor: colors.borderColor,
            }}>
            <Details label={strings.totalItem} data={cartList?.length} />

            <Details
              label={strings.price}
              data={
                strings.$ +
                ' ' +
                getTotalOfMultiplyByKey(cartList, 'price', 'quantity')
              }
            />
            <Details
              label={strings.discount}
              data={
                strings.$ +
                ' ' +
                (getTotalOfMultiplyByKey(
                  cartList,
                  'originalPrice',
                  'quantity',
                ) -
                  getTotalOfMultiplyByKey(cartList, 'revisedPrice', 'quantity'))
              }
            />
          </View>
          <View>
            <Details
              label={strings.totalPrice}
              data={
                strings.$ +
                getTotalOfMultiplyByKey(cartList, 'price', 'quantity')
              }
            />
          </View>
          <GButton
            onPress={navigateToCheckOut}
            title={strings.checkOut}
            bgColor={colors.appyellow}
            containerStyle={localStyles.btnStyle}
            textType={'b16'}
            color={colors.appblack}
          />
        </View>
      )}
    </GSafeAreaView>
  );
};

export default Cart;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  listStyle: {
    ...styles.flex,
    ...styles.mt25,
    ...styles.mh20,
  },
  item: {
    backgroundColor: colors.appwhite,
    ...styles.mv10,
    ...styles.p10,
    ...styles.rowSpaceBetween,
    paddingBottom: moderateScale(15),
    borderTopWidth: 3,
    borderRadius: moderateScale(15),
    borderColor: colors.appyellow,
  },
  couponInput: {
    flex: 6,
    marginHorizontal: moderateScale(0),
  },
  container: {
    ...styles.justifyBetween,
    ...styles.mt15,
  },
  container2: {
    ...styles.pv10,
    ...styles.mh20,
  },

  btn: {
    width: getWidth(30),
    height: getWidth(30),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  btnStyle: {
    ...styles.mv15,
  },
  couponContainer: {
    ...styles.flexRow,
    ...styles.center,
    ...styles.g5,
    ...styles.mt20,
  },
  couponInputStyle: {
    ...styles.mh0,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.shadow2,
  },
  applyBtn: {
    flex: 4,
    backgroundColor: 'red',
    height: moderateScale(50),
  },
});
