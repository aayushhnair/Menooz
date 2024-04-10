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

MenuCard = React.memo(({ item, categoryName, index, getProduct }) => {
    
    const [ratingStar, setRatingStar] = useState([1, 2, 3, 4, 5]);
    const menusubitems = Object.values(item.items);

    const Rating = ({ rating }) => {
        return ratingStar.map(item => {
          return item <= rating ? <Star_Filled /> : <Star_Unfiiled />;
        });
      };
    

    const onAddButtonPress = (item, index) => {
      return getProduct({ item: item, index: index });
    };
    url = "https://i.redd.it/ea4u1b85f8wa1.jpg"
    return (

      <View style={styles.menuCarddetails}>

        <View style={localStyles.menuDetails}>

          <GText style={{ ...styles.ml10 }} color={colors.appwhite} type="r16">{item.name}</GText>
          {menusubitems.map((menuItem, index) => (
            <TouchableOpacity>
              <View key={index} style={localStyles.menuitems}>

                {menuItem.imageUrl ? (
                  <Image
                    source={{ uri: menuItem.imageUrl }}
                    style={localStyles.menuImage}
                  />
                ) : (
                  <Image
                    source={{ uri: url }}
                    style={localStyles.menuImage}
                  />
                )}
                <View style={localStyles.menuitemdetails}>
                  <View style={localStyles.menutitle}>
                    <GText color={colors.appblack} type="b14">{menuItem.name}</GText>
                    <GText color={colors.appblack} type="b14" >{strings.$}{menuItem.price}{"/-"}</GText>
                  </View>
                  <View style={localStyles.Leftproductcontainer}>
                    <View style={localStyles.ratingContainer}>
                      <Rating rating={menuItem.avgRating} />
                      <GText type="b14" color={colors.appblack} style={localStyles.ratingText}>{menuItem.avgRating}</GText>
                    </View>
                    <GButton
                      onPress={() => {
                        onAddButtonPress(menuItem, index);
                      }}
                      icon={<Plus />}
                      bgColor={colors.appyellow}
                      containerStyle={localStyles.addButton} />
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  });

  export default MenuCard;

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
  });
  