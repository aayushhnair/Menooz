import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { useState,useEffect } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import { colors, styles } from '../../themes';
import strings from '../../i18n/strings';
import {
  getHeight,
  getWidth,
  moderateScale,
  screenWidth,
} from '../../common/constants';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import {
  Plus,
  CallIcon,
  Heart,
  HeartFilled,
  Star_Filled,
  Star_Unfiiled,
} from '../../assets/svgs';
import { StackNav } from '../../navigation/NavigationKeys';
import { getProduct } from 'react-native-device-info';
import MenuCard from './MenuItem';

const ProductDetail = ({ route, navigation }) => {
  const categoryName = route?.params.categoryName;
  const product = route?.params.product;
  const status = route?.params.status;
  const [imageLoading, setImageLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [ratingStar, setRatingStar] = useState([1, 2, 3, 4, 5]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const onLoad = () => {
    setImageLoading(true);
  };
  const onLoadEnd = () => {
    setImageLoading(false);
  };



  useEffect(() => {
    global.cart = [];
  }, []);



  const onPressReview = () => navigation.navigate(StackNav.Review);

  function addToCart(data) {
    if (global.cart) {
      if (global.cart.some(item => item.name == data.item.name)) {
        let itemIndex = global.cart.findIndex(
          item => item.name == data.item.name,
        );
        global.cart[itemIndex].quantity = global.cart[itemIndex].quantity + 1;
      } else {
        data.item.quantity = 1;
        global.cart.push(data.item);
      }
    }
  }

  const ImageCarousel = ({ item, index }) => {
    return (
      <View style={styles.center}>
        <Image
          source={{ uri: product.imageUrl }}
          resizeMode="cover"
          onLoadStart={onLoad}
          onLoadEnd={onLoadEnd}
          style={localStyles.imgStyle}
        />
        {imageLoading ? (
          <ActivityIndicator
            style={[localStyles.imgStyle, { position: 'absolute' }]}
          />
        ) : null}
      </View>
    );
  };


  const addToFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const Rating = ({ rating }) => {
    return ratingStar.map(item => {
      return item <= rating ? <Star_Filled /> : <Star_Unfiiled />;
    });
  };

  const navigateToCart = () => {
    navigation.navigate(StackNav.Cart);
  };

  const menuItemData = Object.values(product.menuData);

  const Menucardlayout = ({ item, index }) => {
    return <MenuCard item={item} index={index} getProduct={addToCart} />;
  };


  // const onBuyNowPress = () => {
  //   if (global.cart) {
  //     if (global.cart.some(item => item.productName == product?.productName)) {
  //       let itemIndex = global.cart.findIndex(
  //         item => item?.productName == product?.productName,
  //       );
  //       global.cart[itemIndex].quantity =
  //         global.cart[itemIndex].quantity + quantity;
  //     } else {
  //       product.quantity = quantity;
  //       global.cart.push(product);
  //     }
  //   }
  //   navigateToCart();
  // };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader
        headerTitle={strings.app_name
          // product?.categoryID == 11
          //   ? strings.bundleDetailHeader
          //   : strings.productDetailHeader
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={localStyles.imgContainer}>
        <View style={styles.center}>
        <Image
          source={{ uri: product.imageUrl }}
          resizeMode="cover"

          style={localStyles.imgStyle}
        />
        {imageLoading ? (
          <ActivityIndicator
            style={[localStyles.imgStyle, { position: 'absolute' }]}
          />
        ) : null}
      </View>
          <GButton
            onPress={addToFavorite}
            bgColor={colors.appblack}
            containerStyle={localStyles.addToFavorite}>
            {isFavorite ? <HeartFilled fill={colors.appyellow} /> : <Heart />}
          </GButton>
        </View>
        <View style={localStyles.container2}>
          <View style={localStyles.containerHeader}>
            <GText type="b24" color={colors.appyellow}>
              {product?.restaurantName}
            </GText>
            {product.restaurantPhoneNumber == "" || !status ? (<TouchableOpacity>
              <View style={styles.phoneContainer}>
              </View>
            </TouchableOpacity>) :
              (<TouchableOpacity onPress={() => { Linking.openURL(`tel:${product.restaurantPhoneNumber}`) }} >
                <View style={styles.phoneContainer}>
                  <CallIcon />
                </View>
              </TouchableOpacity>)
            }
          </View>
          {/* Product Details */}
          <View style={localStyles.container3}>
            <GText type="b16" color={colors.appwhite} style={styles.mt15}>
              {strings.productDetailHeader}
            </GText>
            {product.delivery.enabled ? (
              <View>
                <View style={localStyles.containerHeader}>
                  <GText type="r16" color={colors.grayScale4} style={localStyles.description}>
                    {strings.minOrder}
                    <GText type="r16" color={colors.appyellow} style={localStyles.description}>
                      {product?.delivery.deliveryFee}
                    </GText>
                  </GText>
                </View>
                <GText type="r16" color={colors.grayScale4} style={localStyles.description}>
                  {strings.within}
                  <GText type="r16" color={colors.appyellow} style={localStyles.description}>
                    {product?.delivery.distanceLimit}
                  </GText>{strings.km}
                </GText>
              </View>
            ) : (
              <View style={localStyles.containerHeader}>
                <GText type="r16" color={colors.grayScale4} style={localStyles.description}>
                  {strings.deliveryNotAvailable}
                </GText>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={onPressReview}
            style={[localStyles.container, localStyles.container3]}>
            <GText type="b16" color={colors.appwhite}>
              {strings.review}
            </GText>
            <View style={localStyles.ratingContainer}>
              <View style={localStyles.rating}>
                <Rating rating={product?.avgRating} />
              </View>
              {/* <ArrowNext /> */}
            </View>
          </TouchableOpacity>
        </View>
        <View style={localStyles.menucontainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          numColumns={1}
          data={menuItemData} // Assuming menusArray contains the list of menu items
          renderItem={Menucardlayout}
        />
        </View>
      </ScrollView>
    </GSafeAreaView>
  );
};

export default ProductDetail;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  menuitems: {
    ...styles.rowSpaceBetween,
    ...styles.mh10,
    backgroundColor: colors.appwhite,
    ...styles.mv10,
    borderRadius: moderateScale(15),
  },
  menuImage: {
    backgroundColor: colors.grayScale4,
    width: 80,
    height: 80,
    borderTopLeftRadius: moderateScale(15),
    borderBottomLeftRadius: moderateScale(15),
  },
  menuitemdetails: {
    flex: 1,
    ...styles.m20,
    marginVertical: moderateScale(10),
  },
  addButton: {
    ...styles.center,
    borderRadius: moderateScale(15),
    height: moderateScale(28),
    width: moderateScale(80),
  },
  menuDetails: {
    flex: 1,
    marginLeft: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  Leftproductcontainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  ratingText: {
    marginLeft: 5,
    color: colors.appblack,
  },
  menutitle: {
    ...styles.rowSpaceBetween,
    gap: 10,
  },
  imgContainer: {
    backgroundColor: colors.white,
    ...styles.center,
    ...styles.mt25,
    ...styles.mb30,
    ...styles.mh15,
    borderRadius: moderateScale(22),

  },
  imgStyle: {
    borderTopRightRadius: moderateScale(22),
    borderTopLeftRadius: moderateScale(22),
    width: moderateScale(403),
    height: moderateScale(225),
  },
  dotStyle: {
    height: getHeight(5),
    borderRadius: moderateScale(15),
  },
  addToFavorite: {
    position: 'absolute',
    right: moderateScale(15),
    top: moderateScale(15),
    borderRadius: moderateScale(24),
    backgroundColor: colors.white,
    width: moderateScale(48),
    height: moderateScale(48),
  },
  container1: {
    ...styles.rowSpaceBetween,
    marginVertical: moderateScale(10),
  },
  container2: {
    ...styles.mh20,
  },
  container3: {
    ...styles.pb10,
    borderBottomWidth: 1,
    borderColor: colors.shadow2,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.textColor,
    ...styles.selfEnd,
  },
  container: {
    ...styles.mt20,
    ...styles.mb30,
    ...styles.flexRow,
    ...styles.justifyBetween,
  },
  packContainer: {
    ...styles.flexRow,
    ...styles.justifyBetween,
    ...styles.mb20,
  },

  containerHeader: {
    ...styles.rowSpaceBetween,
  },
  btn: {
    width: getWidth(34),
    height: getWidth(34),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  description: {
    ...styles.mt15,
    lineHeight: 20,
  },
  ratingContainer: {
    ...styles.flexRow,
    ...styles.center,
  },
  container4: {
    ...styles.flexRow,
    gap: moderateScale(20),
    ...styles.mb30,
  },
  cartContainer: {
    width: getWidth(60),
    borderWidth: 1,
    borderColor: colors.shadow2,
    ...styles.center,
    borderRadius: moderateScale(16),
    height: getHeight(60),
  },
  buyNowBtn: {
    width: getWidth(320) - moderateScale(20),
    height: getHeight(60),
  },
  imgContainer2: {
    width: moderateScale(50),
    height: moderateScale(50),
    ...styles.center,
    backgroundColor: colors.gray,
    borderRadius: moderateScale(8),
  },
  rating: {
    ...styles.flexRow,
    ...styles.g5,
    marginRight: 16,
  },
  menucontainer : {
    ...styles.mh10,
  }
});
