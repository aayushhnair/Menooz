import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

// Local Imports
import GSafeAreaView from '../../components/common/GSafeAreaView';
import {colors, styles} from '../../themes';
import {DropDown, Location, Menu_Left, Search} from '../../assets/svgs';
import {
  getHeight,
  getWidth,
  moderateScale,
  screenWidth,
} from '../../common/constants';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import images from '../../assets/images';
import strings from '../../i18n/strings';
import {newItem, popularPack} from '../../Api/constant';
import Product from './product';
import {StackNav} from '../../navigation/NavigationKeys';

const Home = () => {
  useEffect(() => {
    global.cart = [];
  }, []);
  const navigation = useNavigation();
  const productCard = ({item, index}) => {
    return <Product item={item} index={index} getProduct={addToCart} />;
  };

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

  const navigateToProductList = (categoryName, productList) => {
    navigation.navigate(StackNav.ProductList, {
      categoryName: categoryName,
      productList: productList,
    });
  };
  const navigateToSearch = () => {
    navigation.navigate(StackNav.Search);
  };

  const Section = ({sectionName, product}) => {
    return (
      <View>
        <View style={localStyles.sectionHeader}>
          <GText color = {colors.appwhite} type="m18">{sectionName}</GText>
          <GButton
            onPress={() => navigateToProductList(sectionName, product)}
            textType="b14"
            color={colors.appyellow}
            title={strings.viewAll}
          />
        </View>
        <View style={localStyles.itemContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          data={product}
          renderItem={productCard}
        />
        </View>
      </View>
    );
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <View style={localStyles.barContainer}>
        {/* <GButton
          icon={<Menu_Left />}
          bgColor={colors.grayScale6}
          containerStyle={localStyles.button}></GButton> */}
        <View style={localStyles.location}>
          <Location fill = {colors.appyellow}/>
          <View style={localStyles.locationText}>
            <View style={styles.rowCenter}>
              <GText type="b14" style={styles.mb5} color = {colors.appyellow} >
                {strings.currLocation}
              </GText>
              <GButton
                icon={<DropDown />}
                containerStyle={localStyles.locationButton}></GButton>
            </View>
            <GText type="r16" color = {colors.appwhite} >{strings.location}</GText>
          </View>
        </View>
        <GButton
          icon={<Search />}
          bgColor={colors.appblack} 
          onPress={navigateToSearch}
          containerStyle={localStyles.button}></GButton>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={localStyles.scrollContainer}>
        {/* <Image
          source={images.home}
          resizeMode="contain"
          style={localStyles.imageStyle}
        /> */}
        {/* <Section sectionName={strings.newItem} product={popularPack} /> */}
        <Section sectionName={strings.newItem} product={newItem} />
      </ScrollView>
    </GSafeAreaView>
  );
};

export default Home;

const localStyles = StyleSheet.create({
  root: {
    backgroundColor: colors.appblack,
    ...styles.flex,
  },
  barContainer: {
    ...styles.mt10,
    ...styles.mb10,
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.mh20,
    ...styles.itemsCenter,
  },
  location: {
    ...styles.selfCenter,
    ...styles.center,
    ...styles.flexRow,
  },
  locationText: {
    ...styles.ml15,
  },
  locationButton: {
    height: getHeight(7),
    marginLeft: moderateScale(5),
  },
  button: {
    ...styles.center,

    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  itemContainer: {
    ...styles.center,

  },
  scrollContainer: {
    marginHorizontal: moderateScale(18),
    marginBottom: moderateScale(90),
  },
  imageStyle: {
    ...styles.mt35,
    width: screenWidth - moderateScale(36),
    height: moderateScale(180),
  },
  sectionHeader: {
    ...styles.mt30,
    ...styles.rowSpaceBetween,
  },
});
