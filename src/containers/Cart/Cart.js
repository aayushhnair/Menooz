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

const Cart = ({navigation}) => {
  const [cartList, setCartList] = useState(global.cart);
  const [refreshing, setRefreshing] = useState(false);
  const [coupon, setCoupon] = useState('');

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
    navigation.navigate(StackNav.CheckOut);
  };
  const deleteItem = index => {
    let temp = global.cart;
    temp.splice(index, 1);
    setCartList([...temp]);
    global.cart = temp;
  };

  const getTotalWeight = () => {
    let packWeight = 0;
    cartList.map(item => {
      return item.categoryID == 11
        ? (packWeight +=
            getTotalByKey(item?.productList, 'wight', 'quantity') *
            item.quantity)
        : null;
    });
    return getTotalOfMultiplyByKey(cartList, 'wight', 'quantity') + packWeight;
  };

  const cartItem = ({item, index}) => {
    return (
      <View style={localStyles.item}>
        <View style={styles.flexRow}>
          <Image
            source={item.imageLink}
            resizeMode="contain"
            style={{width: moderateScale(80), height: moderateScale(80)}}
          />
          <View style={styles.ml20}>
            <GText type="m16" color={colors.textColor}>
              {item.productName}
            </GText>
            <GText type="m14" color={colors.labelColor} style={styles.mt5}>
              {item.categoryID == 11
                ? getTotalByKey(item.productList, 'wight')
                : item.wight}
              {strings.kg}
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
                color={colors.textColor}
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
          <GText type="m20" color={colors.textColor} style={styles.mt15}>
            {strings.$}
            {item.originalPrice}
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
          <GText type="m16" color={colors.textColor}>
            {label}
          </GText>

          <GText type="b16" color={colors.textColor}>
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
          icon={<EmptyCart />}
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
          <GText type={'b16'}>{strings.AddCoupon}</GText>
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
              label={strings.weight}
              data={getTotalWeight() + ' ' + strings.kg}
            />
            <Details
              label={strings.price}
              data={
                strings.$ +
                ' ' +
                getTotalOfMultiplyByKey(cartList, 'originalPrice', 'quantity')
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
                getTotalOfMultiplyByKey(cartList, 'revisedPrice', 'quantity')
              }
            />
          </View>
          <GButton
            onPress={navigateToCheckOut}
            title={strings.checkOut}
            bgColor={colors.green}
            containerStyle={localStyles.btnStyle}
            textType={'b16'}
            color={colors.white}
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
    backgroundColor: colors.white,
  },
  listStyle: {
    ...styles.flex,
    ...styles.mt25,
    ...styles.mh20,
  },
  item: {
    ...styles.mv10,
    ...styles.rowSpaceBetween,
    paddingBottom: moderateScale(15),
    borderBottomWidth: 1,
    borderColor: colors.shadow2,
  },
  couponInput: {
    flex: 6,
    marginHorizontal: moderateScale(0),
  },
  container: {
    ...styles.justifyBetween,
    ...styles.g30,
    ...styles.mt15,
  },
  container2: {
    flex: 1,
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
