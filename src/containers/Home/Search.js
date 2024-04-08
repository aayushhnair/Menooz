import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useRef} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import {colors, styles} from '../../themes';
import {BackArrow, Filter, Search_green, Top_Left} from '../../assets/svgs';
import GInput from '../../components/common/GInput';
import {moderateScale} from '../../common/constants';
import GHeader from '../../components/common/GHeader';
import {StackNav} from '../../navigation/NavigationKeys';
import GButton from '../../components/common/GButton';
import {
  MeatFish,
  category,
  recentSearches,
  vegetables,
} from '../../Api/constant';
import GText from '../../components/common/GText';
import Product from './product';
import SortAndFilter from './SortAndFilter';

const Search = () => {
  const sheetRef = useRef(null);
  const [showRecentSearches, setShowRecentSearches] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const FilterIcon = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          sheetRef?.current?.show();
        }}
        style={localStyles.filterBtn}>
        <Filter />
      </TouchableOpacity>
    );
  };
  const SearchIcon = () => {
    return (
      <TouchableOpacity>
        <Search_green />
      </TouchableOpacity>
    );
  };
  const onSearchTextChange = text => {
    if (text) {
      setShowRecentSearches(false);
      let temp = vegetables
        .concat(MeatFish)
        .filter(item =>
          item.productName.toLowerCase().includes(text.toLowerCase()),
        );
      setSearchResult(temp);
    } else {
      setShowRecentSearches(true);
      setSearchResult([]);
    }
  };
  const renderRecentSearches = ({item, index}) => {
    return (
      <View style={localStyles.recentSearchItem}>
        <GText type="r16" color={colors.labelColor}>
          {item.search_name}
        </GText>
        <GButton icon={<Top_Left />} containerStyle={styles.pv0} />
      </View>
    );
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
  const productCard = ({item, index}) => {
    return (
      <Product
        item={item}
        index={index}
        // categoryName={}
        getProduct={addToCart}
      />
    );
  };
  const renderRecentSearchesHeader = () => {
    return (
      <GText style={styles.mh20} type="m18">
        {strings.recentSearch}
      </GText>
    );
  };
  const renderSearchResultHeader = () => {
    return (
      <GText style={[styles.mh20]} type="m18">
        {searchResult.length} {strings.productFound}
      </GText>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={StackNav.Search} />
      <View style={localStyles.header}>
        <GInput
          placeholder="Search"
          leftIcon={SearchIcon}
          rightIcon={FilterIcon}
          rightIconStyle={styles.mr0}
          style={{width: '85%'}}
          inputStyle={localStyles.input}
          toGetTextFieldValue={onSearchTextChange}
        />
        <GButton title={strings.cancel} />
      </View>
      {showRecentSearches && (
        <FlatList
          data={recentSearches}
          renderItem={renderRecentSearches}
          keyExtractor={(item, index) => {
            index.toString();
          }}
          ListHeaderComponent={renderRecentSearchesHeader}
        />
      )}
      {searchResult.length > 0 && (
        <FlatList
          style={localStyles.list}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={searchResult}
          renderItem={productCard}
          ListHeaderComponent={renderSearchResultHeader}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <SortAndFilter SheetRef={sheetRef} />
    </GSafeAreaView>
  );
};

export default Search;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: 'white',
  },
  header: {
    ...styles.mh20,
    ...styles.mv30,
    ...styles.rowSpaceBetween,
  },
  filterBtn: {
    backgroundColor: colors.green,
    ...styles.p10,
    borderRadius: moderateScale(8),
  },
  input: {
    backgroundColor: colors.gray,
    ...styles.mh0,
  },
  recentSearchItem: {
    ...styles.mh20,
    ...styles.mv5,
    ...styles.pv10,
    ...styles.rowSpaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: colors.shadow2,
  },
  list: {
    ...styles.mh15,
  },
});
