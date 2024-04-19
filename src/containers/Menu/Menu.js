import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GText from '../../components/common/GText';
import {colors, styles} from '../../themes';
import {category} from '../../Api/constant';
import {getHeight, getWidth, moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import {StackNav} from '../../navigation/NavigationKeys';

const Menu = ({navigation}) => {
  const cateGory = ({item, index}) => {
    return (
      <View style={localStyles.categoryItem}>
        <TouchableOpacity
          onPress={() => navigateToProductList(item.categoryname, item.product)}
          style={localStyles.cateGoryButton}>
          {item.categoryIcon}
        </TouchableOpacity>
        <GText type="m14" align="center" color={colors.labelColor}>
          {item.categoryname}
        </GText>
      </View>
    );
  };

  const navigateToProductList = (categoryName, productList) => {
    navigation.navigate(StackNav.ProductList, {
      categoryName: categoryName,
      productList: productList,
    });
  };

  return (
    <GSafeAreaView style={localStyles.container}>
      <GText type="b30" align="center" style={localStyles.header}>
        {strings.chooseCategory}
      </GText>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={category}
        showsVerticalScrollIndicator={false}
        style={styles.mh30}
        numColumns={3}
        renderItem={cateGory}
      />
    </GSafeAreaView>
  );
};

export default Menu;

const localStyles = StyleSheet.create({
  container: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  header: {
    ...styles.mt50,
    ...styles.mb10,
  },
  cateGoryButton: {
    width: moderateScale(94),
    height: moderateScale(94),
    borderRadius: moderateScale(47),
    backgroundColor: colors.gray,
    ...styles.center,
    margin: 10,
  },
  categoryItem: {
    ...styles.mv10,
  },
});
