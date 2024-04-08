import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { colors, styles } from '../../themes';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import strings from '../../i18n/strings';
import { moderateScale, screenWidth } from '../../common/constants';
import { Heart, HeartFilled, Plus } from '../../assets/svgs';
import { StackNav } from '../../navigation/NavigationKeys';
import { getTotalByKey } from '../../utils/helpers';
import { useState } from 'react';

const Product = ({ item, index, categoryName, getProduct }) => {
  const navigation = useNavigation();
  const navigateToDetail = () => {
    navigation.navigate(StackNav.ProductDetail, {
      product: item,
      categoryName: categoryName,
    });
  };
  const [isClicked, setIsClicked] = useState(false);

  const onAddButtonPress = () => {
    setIsClicked(!isClicked);
  };
  return (
    <TouchableOpacity onPress={navigateToDetail} style={localStyles.product}>
      <View style={styles.center}>
        <Image
          source={{ uri: item.imageLink }}
          resizeMode="cover"
          style={localStyles.imageStyle}
        />
      </View>
      <View style={localStyles.productdetails}>
        <GText
          type="b20"
          color={colors.appblack}
          style={localStyles.productNameStyle}>
          {item.productName}
        </GText>
        {categoryName == 'Popular Pack' ? (
          <GText
            type="m14"
            numberOfLines={1}
            ellipsizeMode="tail"
            color={colors.appwhite}
            style={styles.mt5}>
            {item.productList.map(u => u.productName).join(',')}
          </GText>
        ) : (
          <GText type="m14" color={colors.appblack} style={styles.mt5}>
            {strings.status}<GText type="b14" color={colors.appyellow} style={styles.mt5}>{ "OPEN" }</GText>
          </GText>
          
        )}

        <View style={localStyles.container2}>
          <GText type="b16" color={colors.appblack}>
            {strings.review}
            {/* {item.revisedPrice} */}
          </GText>
          <GButton
            onPress={() => {
              onAddButtonPress();
            }}
            icon={isClicked ? <HeartFilled/>: <Heart/> }  
            bgColor={colors.appwhite}
            containerStyle={localStyles.addButton}
          />
        </View>
      </View>
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
    borderWidth: 3,
    borderColor: colors.appwhite,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    width: '100%',
    height: moderateScale(120),
  },
  container2: {
    ...styles.rowSpaceBetween,
    ...styles.mt10,
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
