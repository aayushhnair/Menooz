import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Local Imports
import GSafeAreaView from '../../components/common/GSafeAreaView';
import { colors, styles } from '../../themes';
import { DropDown, Location, Menu_Left, Search } from '../../assets/svgs';
import {
  getHeight,
  getWidth,
  moderateScale,
  screenWidth,
} from '../../common/constants';
import GText from '../../components/common/GText';
import GButton from '../../components/common/GButton';
import strings from '../../i18n/strings';
import Product from './product';
import { StackNav } from '../../navigation/NavigationKeys';
import fetchRestaurantData from '../../Api/restaurantdata';
import PopupModal from '../../components/customComponent.js/PopUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestNewLocationPermissions } from '../../Api/locationService';

const Home = () => {

  const [restaurants, setRestaurants] = useState([]);
  const userLatitude = 13.047078;
  const userLongitude = 80.120823;
  const [touch, setTouch] = useState(true);
  const [value, setValue] = useState('');
  const [distance, setDistance] = useState(3);
  const restaurantKeys = Object.keys(restaurants);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState(null);


  useEffect(() => {
    const getLocation = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('location');

        if (storedLocation) {
          setLocation(JSON.parse(storedLocation));
        } else {
          const newLocation = await requestLocationPermission();
          setLocation(newLocation);
        }
      } catch (error) {
        console.error('Error getting location from AsyncStorage:', error);
      }
    };

    getLocation();

    fetchRestaurantData(location?.latitude, location?.longitude, distance, (data) => {
      setRestaurants(data);
    });
    global.cart = [];

  }, []);



  const navigation = useNavigation();

  const productCard = ({ item, index }) => {
    return <Product item={item} index={index} id={item.restaurantid} name={item.restaurantName} />;
  };


  const navigateToProductList = (categoryName, productList) => {
    navigation.navigate(StackNav.ProductList, {
      categoryName: categoryName,
      productList: productList,
    });
  };
  const navigateToSearch = () => {
    // navigation.navigate(StackNav.Search);
  };


  const Section = ({ sectionName, product }) => {
    return (
      <View>
        <View style={localStyles.sectionHeader}>
          <GText color={colors.appwhite} type="m18">{sectionName}</GText>
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
        <TouchableOpacity onPress={() => requestNewLocationPermissions()}>
          <View style={localStyles.location}>
            <Location fill={colors.appyellow} />
            <View style={localStyles.locationText}>
              <View style={styles.rowCenter}>
                <GText type="b14" style={styles.mb5} color={colors.appyellow} >
                  {strings.currLocation}
                </GText>
                <GButton
                  icon={<DropDown />}
                  containerStyle={localStyles.locationButton}></GButton>
              </View>
              <GText type="r16" color={colors.appwhite} >{strings.location}</GText>
            </View>
          </View>
        </TouchableOpacity>
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
        <Section sectionName={strings.newItem} product={restaurants} />
      </ScrollView>
      {isModalVisible && (
        <PopupModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} stringToShow={strings.cartCleared} />
      )}
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
  locationinput: {
    ...styles.rowSpaceBetween,
    ...styles.mh10,
    ...styles.mv10,
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
  locationButton1: {
    borderRadius: moderateScale(15),
    height: "10%",
  },
  rangebutton: {
    width: '50%',
    height: "80%",
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
