import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import {colors, styles} from '../../themes';
import GHeader from '../../components/common/GHeader';
import {getWidth, moderateScale} from '../../common/constants';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import {Delete, MinusGreen, PlusGreen} from '../../assets/svgs';
import strings from '../../i18n/strings';
import {getTotalOfMultiplyByKey} from '../../utils/helpers';

const CreateBundleDetails = ({route, navigation}) => {
  const [productList, setProductList] = useState(
    route?.params?.packProductList,
  );
  const [refreshing, setRefreshing] = useState(false);
  const packItem = ({item, index}) => {
    return (
      <View style={localStyles.item}>
        <View style={styles.flexRow}>
          <Image
            source={item.imageLink}
            resizeMode="contain"
            style={localStyles.imgStyle}
          />
          <View style={styles.ml20}>
            <GText type="m16" color={colors.textColor}>
              {item.productName}
            </GText>
            <GText type="m14" color={colors.labelColor} style={styles.mt5}>
              {item.wight} {strings.kg}
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
            containerStyle={{height: 0}}
          />
          <GText type="m20" color={colors.textColor}>
            {strings.$} {item.originalPrice * item.quantity}
          </GText>
        </View>
      </View>
    );
  };
  const deleteItem = index => {
    let temp = [...productList];
    temp.splice(index, 1);
    setProductList(temp);
  };
  const increaseQuantity = index => {
    let temp = [...productList];
    temp[index].quantity = temp[index].quantity + 1;
    setProductList(temp);
  };
  const decreaseQuantity = index => {
    let temp = [...productList];
    if (temp[index].quantity == 1) return;
    temp[index].quantity = temp[index].quantity - 1;
    setProductList(temp);
  };
  const refresh = () => {
    // setRefreshing(true);
    setProductList(route?.params?.packProductList);
    // setRefreshing(false);
  };
  const Details = ({label, data}) => {
    return (
      <View style={styles.mt20}>
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
  const onCreateBundlePackPress = () => {
    // API call
  };
  useEffect(() => {
    if (productList.length == 0) {
      navigation.goBack();
    }
  }, [productList]);

  const ListFooterComponent = () => {
    return (
      <View>
        <View style={localStyles.container2}>
          <Details label={strings.totalItem} data={productList?.length} />
          <Details
            label={strings.weight}
            data={
              getTotalOfMultiplyByKey(productList, 'wight', 'quantity') +
              ' ' +
              strings.kg
            }
          />
          <Details
            label={strings.price}
            data={
              strings.$ +
              ' ' +
              getTotalOfMultiplyByKey(productList, 'originalPrice', 'quantity')
            }
          />
          <Details
            label={strings.discount}
            data={
              strings.$ +
              ' ' +
              (getTotalOfMultiplyByKey(
                productList,
                'originalPrice',
                'quantity',
              ) -
                getTotalOfMultiplyByKey(
                  productList,
                  'revisedPrice',
                  'quantity',
                ))
            }
          />
        </View>
        <View style={styles.mh20}>
          <Details
            label={strings.totalPrice}
            data={
              strings.$ +
              getTotalOfMultiplyByKey(productList, 'revisedPrice', 'quantity')
            }
          />
        </View>
        <GButton
          onPress={onCreateBundlePackPress}
          title={strings.createBundlePack}
          bgColor={colors.green}
          containerStyle={localStyles.btnStyle}
          textType={'b16'}
          color={colors.white}
        />
      </View>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.bundleDetailHeader} />
      <FlatList
        style={localStyles.listStyle}
        data={productList}
        renderItem={packItem}
        showsVerticalScrollIndicator={false}
        onRefresh={refresh}
        refreshing={refreshing}
        keyExtractor={(item, index) => index.toString()}
      />
      <ListFooterComponent />
    </GSafeAreaView>
  );
};

export default CreateBundleDetails;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: 'white',
  },
  listStyle: {
    ...styles.mt25,
    ...styles.mh20,
    ...styles.flex,
  },
  item: {
    ...styles.mv10,
    ...styles.mh10,
    ...styles.rowSpaceBetween,
    paddingBottom: moderateScale(10),
    borderBottomWidth: 1,
    borderColor: colors.shadow2,
  },
  container: {
    ...styles.justifyBetween,
    ...styles.g30,
  },
  btn: {
    width: getWidth(30),
    height: getWidth(30),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  container2: {
    ...styles.mh20,
    ...styles.pb20,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  btnStyle: {
    ...styles.mv20,
    ...styles.mh20,
  },
  imgStyle: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
});
