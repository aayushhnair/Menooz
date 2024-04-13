import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { colors, styles } from '../../themes';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import strings from '../../i18n/strings';
import { moderateScale, screenWidth } from '../../common/constants';
import { Heart, HeartFilled, Plus, Star_Filled, Star_Unfiiled } from '../../assets/svgs';
import { StackNav } from '../../navigation/NavigationKeys';
import { useState } from 'react';
import PopupModal from '../../components/customComponent.js/PopUp';

const Product = ({ item, index, id, categoryName, getProduct }) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigateToDetail = () => {
    if(isRestaurantOpen()){
    navigation.navigate(StackNav.ProductDetail, {
      product: item,
      categoryName: categoryName,
      status: isRestaurantOpen(),
      restaurantID: id,
    });}else{
      setIsModalVisible(true);
    }
  };

  
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentHour = now.getHours();
  const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
  const openingHour = item.operatingHours[currentDay]?.open;
  const closingHour = item.operatingHours[currentDay]?.close;
  const showOpenhour = openingHour ? openingHour.split(':').slice(0, 2).join(':') : '';
  const showClosehour = closingHour ? closingHour.split(':').slice(0, 2).join(':') : '';
  const [ratingStar, setRatingStar] = useState([1, 2, 3, 4, 5]);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const Rating = ({ rating }) => {
    return ratingStar.map(item => {
      return item <= rating ? <Star_Filled /> : <Star_Unfiiled />;
    });
  };

  const isRestaurantOpen = () => {

    if (openingHour && closingHour) {
      const [openHour, openMinute] = openingHour.split(':').map(Number);
      const [closeHour, closeMinute] = closingHour.split(':').map(Number);

      // Check if the current time is within the opening and closing hours
      if (
        currentHour > openHour ||
        (currentHour === openHour && now.getMinutes() >= openMinute)
      ) {
        if (
          currentHour < closeHour ||
          (currentHour === closeHour && now.getMinutes() < closeMinute)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  
  return (
    <TouchableOpacity onPress={navigateToDetail} style={[localStyles.product, !isRestaurantOpen() && localStyles.overlay]}>
      <View style={styles.center}>
        <Image
          source={{ uri: item.imageUrl }}
          resizeMode="cover"
          style={localStyles.imageStyle}
        />
      </View>
      <View style={localStyles.productdetails}>
        <GText
          type="b20"
          color={colors.appblack}
          style={localStyles.productNameStyle}>
          {item.restaurantName}
        </GText>
        <View style={localStyles.reviewContainer}>
          <GText type="b16" color={colors.appblack}>
            {strings.ratings}
          </GText>
           <Rating rating={item.avgRating} />
        </View>
        <View style={localStyles.container2}>
          <GText type="m14" color={colors.appblack} style={styles.mt5}>
            {strings.status}<GText type="b14" color={colors.appyellow} style={styles.mt5}>
              {isRestaurantOpen() ? <GText type="b14" color={colors.appyellow} style={styles.mt5}> OPEN </GText> : <GText type="b14" color='red' style={styles.mt5}> CLOSED </GText>}
            </GText>
            <GText type="m14" color={colors.appblack} style={styles.mt5}>{" ("}{showOpenhour}{" - "}{showClosehour}{") "}</GText>
          </GText>
          <GButton
            onPress={() => {
              addToFavorite();
            }}
            icon={isFavorite ? <HeartFilled /> : <Heart  fill ={colors.grayScale7}/>}
            containerStyle={localStyles.addButton}
          />
        </View>
      </View>
      {isModalVisible && (
        <PopupModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} stringToShow={strings.shopClosed} />
      )}
    </TouchableOpacity>
  );
};

export default Product;

const localStyles = StyleSheet.create({
  product: {
    backgroundColor: colors.appwhite,
    width: screenWidth - 55,
    margin: '2%',
    borderRadius: moderateScale(20),
  },
  imageStyle: {
    // borderWidth: 10,
    // borderColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    width: '100%',
    height: moderateScale(120),
  },
  overlay: {
    backgroundColor: colors.grayScale5, // Adjust opacity as needed
  },
  container2: {
    ...styles.rowSpaceBetween,
    ...styles.mt10,
  },
  reviewContainer: {

    ...styles.flexRow,
    alignItems: 'center',
  },
  addButton: {
    ...styles.center,
    borderRadius: moderateScale(14),
    height: moderateScale(28),
    width: moderateScale(28),
  },
  productNameStyle: {
    ...styles.mt15,
    height: moderateScale(35),
  },
  productdetails: {
    ...styles.ph15,
    ...styles.pv10,
  },
});
