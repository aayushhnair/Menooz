import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
import GButton from '../../components/common/GButton';
import {SmallCartWhite} from '../../assets/svgs';
import Product from '../Home/product';
import strings from '../../i18n/strings';
import {StackNav} from '../../navigation/NavigationKeys';

const ProductList = ({navigation, route}) => {
  const categoryName = route?.params.categoryName;
  const productList = route?.params.productList.concat(
    route?.params.productList,
  );
  function addToCart(data) {
    if (global.cart) {
      if (global.cart.some(item => item.productName == data.item.productName)) {
        let itemIndex = global.cart.findIndex(
          item => item.productName == data.item.productName,
        );
        global.cart[itemIndex].quantity = global.cart[itemIndex].quantity + 1;
      } else {
        data.item.quantity = 1;
        global.cart.push(data.item);
      }
    }
  }
  const productCard = ({item, index}) => {
    return (
      <Product
        item={item}
        index={index}
        categoryName={categoryName}
        getProduct={addToCart}
      />
    );
  };
  const goToCreateMyPack = () => {
    navigation.navigate(StackNav.CreateMyPack);
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={categoryName} />
      <FlatList
        style={localStyles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={productList}
        renderItem={productCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.wrap}
      />
      {(categoryName == strings.popularPack || categoryName == 'Pack') && (
        <GButton
          onPress={goToCreateMyPack}
          frontIcon={<SmallCartWhite />}
          title={strings.createOwnPack}
          textType={'b14'}
          color={colors.white}
          containerStyle={localStyles.btn}
          bgColor={colors.green}
        />
      )}
    </GSafeAreaView>
  );
};

export default ProductList;

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    ...styles.flex,
  },
  list: {
    ...styles.mh15,
    ...styles.mt25,
  },
  btn: {
    ...styles.mh25,
    ...styles.mb25,
    ...styles.mt10,
  },
});
