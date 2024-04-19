import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'
import React, { useState, useEffect } from 'react';
import GText from '../../components/common/GText';
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
import GButton from '../../components/common/GButton';
import {
  Plus,
  CallIcon,
  Heart,
  HeartFilled,
  Star_Filled,
  Star_Unfiiled,
  Cart_2,
} from '../../assets/svgs';
import { StackNav } from '../../navigation/NavigationKeys';
import { getProduct } from 'react-native-device-info';
import MenuCard from './MenuItem';
import PopupModal, { CartPopupModal } from '../../components/customComponent.js/PopUp';

const ProductDetail = ({ route, navigation }) => {
  const categoryName = route?.params.categoryName;
  const product = route?.params.product;
  const status = route?.params.status;
  const restaurantID = route?.params.restaurantID;
  const restaurantName = route?.params.restaurantName;
  const [imageLoading, setImageLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [ratingStar, setRatingStar] = useState([1, 2, 3, 4, 5]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartCounter, setCartCounter] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isCartWarningVisible, setIsCartWarningVisible] = useState(false);

  


  useEffect(() => {
    
    if(global.cart)
    {if(global.cart[0]?.restaurantID != restaurantID)
   { setIsCartWarningVisible(true);}}
  }, []);



  const handleProceed = () => {
   
      global.cart = [];
      setIsCartWarningVisible(false);
  };

  const handleGoBack = () => {
    setIsCartWarningVisible(false);
    navigation.navigate(StackNav.TabBar)

  };

  const onPressReview = () => navigation.navigate(StackNav.Review);
  
  function addToCart(data) {
    console.log("\nHow Cart Works : ", data);

    // Add storeID to the item
    data.item.restaurantID = restaurantID;

    if (global.cart) {
        if (global.cart.some(item => item.name === data.item.name && item.storeID === data.storeID)) {
            let itemIndex = global.cart.findIndex(
                item => item.name === data.item.name && item.storeID === data.storeID
            );
            global.cart[itemIndex].quantity += 1;
        } else {
            data.item.quantity = 1;
            global.cart.push(data.item);
        }
    }
    
    // Calculate total quantity
    let totalQuantity = 0;
    if (global.cart) {
        totalQuantity = global.cart.reduce((total, item) => total + item.quantity, 0);
    }
    setCartCounter(totalQuantity);
}




  const addToFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const Rating = ({ rating }) => {
    return ratingStar.map(item => {
      return item <= rating ? <Star_Filled /> : <Star_Unfiiled />;
    });
  };

  const navigateToCart = () => {
    navigation.navigate(StackNav.Cart, {
      restaurantID: restaurantID,
      restaurantName: restaurantName,
    });
  };

  const menuItemData = Object.values(product.menuData);

  const Menucardlayout = ({ item, index }) => {
    return <MenuCard item={item} index={index} id={restaurantID} getProduct={addToCart} />;
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
            <TouchableOpacity onPress={navigateToCart} >
              <View style={localStyles.phoneIconContainer}>
                <Cart_2 />
                <View style={localStyles.cartCounterContainer} >
                  <GText type="r16" color={colors.grayScale4} >
                    {cartCounter}
                  </GText></View>
              </View>
            </TouchableOpacity>
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
      <CartPopupModal
        isVisible={isCartWarningVisible}
        onClose={handleProceed}
        onBack={handleGoBack}
      />
      {/* {isModalVisible && (
        <PopupModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} stringToShow={strings.cartCleared} />
      )}  */}
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
    backgroundColor: colors.appblack,
    ...styles.center,
    ...styles.mt25,
    ...styles.mb20,
    ...styles.mh15,
    borderRadius: moderateScale(22),

  },
  phoneIconContainer: {
    ...styles.rowSpaceBetween,
    gap: 10,
    borderWidth: 2,
    borderColor: colors.appyellow,
    borderRadius: 50,
    padding: 12,
  },
  cartCounterContainer: {
    ...styles.center,
    padding: 2,
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
  menucontainer: {
    ...styles.mh10,
  }
});
