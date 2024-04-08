import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import {colors, styles} from '../../themes';
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
  ArrowNext,
  Cart_2,
  Heart,
  HeartFilled,
  MinusGreen, 
  PlusGreen,
  Star_Filled,
} from '../../assets/svgs';
import {getTotalByKey} from '../../utils/helpers';
import {StackNav} from '../../navigation/NavigationKeys';

const ProductDetail = ({route, navigation}) => {
  const categoryName = route?.params.categoryName;
  const product = route?.params.product;
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

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onPressReview = () => navigation.navigate(StackNav.Review);

  const PackInformation = ({label, data}) => {
    return (
      <View>
        <GText type="b16" color={colors.textColor} align="center">
          {data}
        </GText>
        <GText
          type="r14"
          color={colors.labelColor}
          align="center"
          style={styles.mt5}>
          {label}
        </GText>
      </View>
    );
  };
  const ImageCarousel = ({item, index}) => {
    return (
      <View style={styles.center}>
        <Image
          source={{uri : item}}
          resizeMode="cover"
          onLoadStart={onLoad}
          onLoadEnd={onLoadEnd}
          style={localStyles.imgStyle}
        />
        {imageLoading ? (
          <ActivityIndicator
            style={[localStyles.imgStyle, {position: 'absolute'}]}
          />
        ) : null}
      </View>
    );
  };

  const packItem = ({item, index}) => {
    return (
      <View style={localStyles.container1}>
        <View style={styles.flexRow}>
          <View style={localStyles.imgContainer2}>
            <Image
              source={item.imageLink}
              resizeMode="contain"
              style={{width: moderateScale(25), height: moderateScale(25)}}
            />
          </View>

          <GText
            type="m16"
            color={colors.textColor}
            align="center"
            style={[styles.ml20, styles.selfCenter]}>
            {item.productName}
          </GText>
        </View>

        <GText type="m16" color={colors.textColor}>
          {item.wight} {strings.kg}
        </GText>
      </View>
    );
  };
  const addToFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const Rating = ({rating}) => {
    return ratingStar.map(item => {
      return item <= rating ? <Star_Filled /> : null;
    });
  };

  const navigateToCart = () => {
    navigation.navigate(StackNav.Cart);
  };

  const onBuyNowPress = () => {
    if (global.cart) {
      if (global.cart.some(item => item.productName == product?.productName)) {
        let itemIndex = global.cart.findIndex(
          item => item?.productName == product?.productName,
        );
        global.cart[itemIndex].quantity =
          global.cart[itemIndex].quantity + quantity;
      } else {
        product.quantity = quantity;
        global.cart.push(product);
      }
    }
    navigateToCart();
  };

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
          <Carousel
            data={[product.imageLink, product.imageLink, product.imageLink]}
            renderItem={ImageCarousel}
            sliderWidth={screenWidth - 30}
            itemWidth={screenWidth - 30}
            onSnapToItem={index => setIndex(index)}
            contentContainerStyle={styles.center}
          />
          <Pagination
            dotsLength={3}
            activeDotIndex={index}
            dotStyle={[
              localStyles.dotStyle,
              {
                width: getWidth(10),
                backgroundColor: colors.appyellow,
              },
            ]}
            inactiveDotStyle={[
              localStyles.dotStyle,
              {
                width: getWidth(6),
                backgroundColor: colors.grayScale6,
              },
            ]}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
          <GButton
            onPress={addToFavorite}
            bgColor={colors.appblack}
            containerStyle={localStyles.addToFavorite}>
            {isFavorite ? <HeartFilled fill = {colors.appyellow}/> : <Heart/>}
          </GButton>
        </View>
        <View style={localStyles.container2}>
          <GText type="b24" color={colors.appyellow}>
            {product?.productName}
          </GText>
          {product?.categoryID != 11 ? (
            <GText type="r16" color={colors.appwhite} style={styles.mt15}>
              {strings.shoplocation}
            </GText>
          ) : null}
          {/* product price and quantity increase and decrease */}

          {/* Pack Details if Product is pack */}
          {product?.categoryID == 11 && (
            <View>
              <View style={localStyles.packContainer}>
                <PackInformation
                  label={strings.weight}
                  data={
                    getTotalByKey(product?.productList, 'wight') +
                    ' ' +
                    strings.kg
                  }
                />
                <PackInformation label={strings.size} data={product?.size} />
                <PackInformation
                  label={strings.item}
                  data={product?.productList?.length}
                />
              </View>
              <View>
                <GText type="b16" color={colors.textColor}>
                  {strings.packDetails}
                </GText>
                <View>
                  <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={product?.productList}
                    renderItem={packItem}
                  />
                </View>
              </View>
            </View>
          )}
          {/* Product Details */}
          <View style={localStyles.container3}>
            <GText type="b16" color={colors.appwhite} style={styles.mt15}>
              {strings.productDetailHeader}
            </GText>
            <GText
              type="r16"
              color={colors.grayScale4}
              style={localStyles.description}>
              {product?.productDetails}
            </GText>
          </View>
          <TouchableOpacity
            onPress={onPressReview}
            style={[localStyles.container, localStyles.container3]}>
            <GText type="b16" color={colors.appwhite}>
              {strings.review}
            </GText>
            <View style={localStyles.ratingContainer}>
              <View style={localStyles.rating}>
                <Rating rating={product?.rating} />
              </View>
              <ArrowNext />
            </View>
          </TouchableOpacity>
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
  imgContainer: {
    backgroundColor: colors.appblack,
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
});
