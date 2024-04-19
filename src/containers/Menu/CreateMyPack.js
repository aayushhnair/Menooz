import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GHeader from '../../components/common/GHeader';
import {StackNav} from '../../navigation/NavigationKeys';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import {colors, styles} from '../../themes';
import GText from '../../components/common/GText';
import GInput from '../../components/common/GInput';
import strings from '../../i18n/strings';
import {
  moderateScale,
  screenFullHeight,
  screenHeight,
  screenWidth,
} from '../../common/constants';
import GButton from '../../components/common/GButton';
import {GreenContainer, Next_Green, Search} from '../../assets/svgs';
import typography from '../../themes/typography';
import {category} from '../../Api/constant';
import Product from '../Home/product';
import {getDeviceType} from '../../utils/helpers';
import {Circle, Svg} from 'react-native-svg';

const CreateMyPack = ({navigation}) => {
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [packProductList, setPackProductList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  const getCategoryList = async () => {
    let tempCategory = category.map(item => {
      return {...item, is_selected: false};
    });
    tempCategory[0].is_selected = true;
    setCategoryList(tempCategory);
    setProductList(tempCategory[0].product);
  };

  const navigateToCreateBundleDetails = () => {
    navigation.navigate(StackNav.CreateBundleDetails, {
      packProductList: packProductList,
    });
  };
  function selectItem(index) {
    let tempCategory = categoryList.map(item => {
      return {...item, is_selected: false};
    });
    tempCategory[index].is_selected = true;
    setProductList(tempCategory[index].product);
    setCategoryList(tempCategory);
  }

  const productCard = ({item, index}) => {
    return (
      <Product
        item={item}
        index={index}
        categoryName={item.categoryname}
        getProduct={addToNewPack}
      />
    );
  };

  const categoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => selectItem(index)}
        style={[
          localStyles.categoryItem,
          {backgroundColor: item?.is_selected ? colors.green : 'transparent'},
        ]}>
        <GText
          type="b14"
          color={item?.is_selected ? colors.white : colors.labelColor}>
          {item.categoryname}
        </GText>
      </TouchableOpacity>
    );
  };

  function addToNewPack(data) {
    let tempPackProductList = [...packProductList];
    if (
      tempPackProductList.some(
        item => item.productName == data.item.productName,
      )
    ) {
      let itemIndex = tempPackProductList.findIndex(
        item => item.productName == data.item.productName,
      );
      tempPackProductList[itemIndex].quantity =
        tempPackProductList[itemIndex].quantity + 1;
    } else {
      data.item.quantity = 1;
      tempPackProductList.push(data.item);
    }
    setPackProductList(tempPackProductList);
  }
  const packProducts = ({item, index}) => {
    return (
      <View style={localStyles.packProduct}>
        <View style={localStyles.packProductImage}>
          <Image
            source={item.imageLink}
            resizeMode="contain"
            style={localStyles.imgStyle}
          />
        </View>
        {item?.quantity && (
          <View style={localStyles.quantity}>
            <GText type="b8">{item?.quantity}</GText>
          </View>
        )}
      </View>
    );
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <View
        style={[
          localStyles.container1,
          {flex: packProductList.length > 0 ? 0.9 : 1},
        ]}>
        <GHeader headerTitle={StackNav.CreateMyPack} />
        <View style={localStyles.container}>
          <View style={localStyles.searchBar}>
            <TextInput
              placeholder={strings.searchProduct}
              placeholderTextColor={colors.labelColor}
              style={localStyles.inputStyle}
            />
            <GButton icon={<Search />} containerStyle={localStyles.button} />
          </View>
          {/* Category List */}
          <View style={styles.mt20}>
            <FlatList
              data={categoryList}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={categoryItem}
              horizontal
            />
          </View>
          <View style={styles.flex}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              style={styles.mt20}
              numColumns={2}
              data={productList}
              showsVerticalScrollIndicator={false}
              renderItem={productCard}
            />
          </View>
        </View>
      </View>
      {packProductList.length > 0 && (
        <View
          style={{
            flex: packProductList.length > 0 ? 0.15 : 1,
            ...styles.center,
          }}>
          <GreenContainer />
          <View style={localStyles.container2}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={packProductList}
              renderItem={packProducts}
              horizontal
              style={localStyles.packProductList}
              showsHorizontalScrollIndicator={false}
            />

            <View
              style={{
                width: '30%',
                ...styles.rowSpaceBetween,
                ...styles.center,
              }}>
              <GText type={'b18'} color={colors.white}>
                {strings.$}
                {packProductList.length}
              </GText>
              <GButton
                onPress={navigateToCreateBundleDetails}
                icon={<Next_Green />}
                bgColor={colors.white}
                containerStyle={localStyles.buttonNext}
              />
            </View>
          </View>
        </View>
      )}
    </GSafeAreaView>
  );
};

export default CreateMyPack;

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    ...styles.flex,
  },
  container: {
    ...styles.flex,
    ...styles.mh20,
    ...styles.mt20,
  },
  searchBar: {
    ...styles.rowSpaceBetween,
    backgroundColor: colors.gray,
    borderRadius: moderateScale(10),
  },
  inputStyle: {
    width: '90%',
    height: '100%',
    ...styles.ph20,
    ...styles.pv15,
    ...typography.fontWeights.Medium,
    ...typography.fontSizes.f16,
  },
  button: {
    height: 0,
    ...styles.mr15,
    ...styles.center,
  },
  categoryItem: {
    ...styles.center,
    ...styles.pv15,
    ...styles.ph15,
    borderRadius: moderateScale(20),
  },
  container1: {
    backgroundColor: colors.white,
  },
  container2: {
    position: 'absolute',
    ...styles.center,
    ...styles.flexRow,
  },
  packProduct: {
    height: moderateScale(50),
  },
  imgStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(10),
  },
  packProductImage: {
    backgroundColor: colors.white,
    padding: moderateScale(5),
    borderRadius: moderateScale(30),
    ...styles.m5,
  },
  quantity: {
    ...styles.center,
    ...styles.mr5,
    ...styles.mt5,
    backgroundColor: colors.white,
    padding: moderateScale(2),
    borderRadius: moderateScale(8),
    width: moderateScale(15),
    height: moderateScale(15),
    position: 'absolute',
    right: -8,
    top: -2,
  },
  packProductList: {
    width: '70%',
  },
  buttonNext: {
    width: moderateScale(50),
    height: moderateScale(50),
    ...styles.ml10,
    borderRadius: moderateScale(50),
    ...styles.center,
  },
});
