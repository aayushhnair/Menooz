import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ActionSheet, {FlashList, FlatList} from 'react-native-actions-sheet';
import {styles, colors} from '../../themes';
import GButton from '../../components/common/GButton';
import {
  Cross,
  DropDown,
  Filter,
  Star_Filled,
  Star_Unfiiled,
} from '../../assets/svgs';
import strings from '../../i18n/strings';
import GText from '../../components/common/GText';
import {moderateScale, screenWidth} from '../../common/constants';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Brands, category} from '../../Api/constant';
import FilterSection from '../../components/customComponent.js/filterSection';

const SortAndFilter = props => {
  const {SheetRef} = props;
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [displayCategory, setDisplayCategory] = useState(category.slice(0, 3)); // 6 is the number of items to display initially
  const [displayBrand, setDisplayBrand] = useState(Brands.slice(0, 3)); // 6 is the number of items to display initially
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [star, setStar] = useState([1, 2, 3, 4, 5]);
  const [rating, setRating] = useState(1);
  const hideSheet = () => {
    props?.SheetRef?.current?.hide();
  };
  const Rating = () => {
    return (
      <View style={localStyles.rating}>
        {star.map((item, index) => {
          return (
            <TouchableOpacity onPress={() => setRating(item)} key={index}>
              {item <= rating ? (
                <Star_Filled width="30" height="30" />
              ) : (
                <Star_Unfiiled />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <ActionSheet
      ref={SheetRef}
      gestureEnabled={false}
      // useBottomSafeAreaPadding={true}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={localStyles.header}>
          <GButton
            onPress={hideSheet}
            bgColor={colors.gray}
            containerStyle={localStyles.crossBtn}
            icon={<Cross />}
          />
          <GText type="b18">{strings.filter}</GText>
          <GButton textType="m18" title={strings.reset} />
        </View>
        <View style={localStyles.container}>
          <GText type="b16">{strings.sort_by}</GText>
          <View style={[styles.rowCenter, styles.g10]}>
            <GText type="b16">{strings.popularity}</GText>
            <GButton icon={<DropDown />} />
          </View>
        </View>
        <View style={localStyles.Container2}>
          <GText type="b16">{strings.price_range}</GText>
          <View style={styles.itemsCenter}>
            <MultiSlider
              sliderLength={screenWidth - moderateScale(60)}
              values={[0, 10]}
              min={0}
              onValuesChange={values => console.log(values)}
              markerOffsetY={13}
              selectedStyle={{backgroundColor: colors.green, height: 6}}
              trackStyle={[
                {
                  height: 4,
                  backgroundColor: colors.grayScale4,
                },
              ]}
              customMarker={e => {
                return (
                  <View style={styles.g5}>
                    <View
                      style={{
                        height: moderateScale(20),
                        width: moderateScale(20),
                        backgroundColor: colors.green,
                        borderWidth: 2,
                        borderColor: colors.white,
                        shadowColor: colors.shadow,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        elevation: 5,
                        shadowOpacity: 1,
                        shadowRadius: 1.41,
                        borderRadius: moderateScale(10),
                      }}></View>
                    <GText align={'center'}>{e.currentValue}</GText>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={localStyles.Container2}>
          <FilterSection
            title={strings.cate}
            displayList={displayCategory}
            setDisplayList={setDisplayCategory}
            list={category}
            selectedList={selectedCategory}
            setSelectedList={setSelectedCategory}
          />
          <FilterSection
            title={strings.cate}
            displayList={displayBrand}
            setDisplayList={setDisplayBrand}
            list={Brands}
            selectedList={selectedBrand}
            setSelectedList={setSelectedBrand}
          />
        </View>
        <View style={styles.mh30}>
          <GText type="b16">{strings.rating_star}</GText>
          <Rating />
        </View>
        <GButton
          textType={'b16'}
          title={strings.apply + ' ' + strings.filter}
          containerStyle={[styles.mh30, styles.mv15]}
          onPress={hideSheet}
          color={colors.white}
          bgColor={colors.green}
        />
      </ScrollView>
    </ActionSheet>
  );
};

export default SortAndFilter;

const localStyles = StyleSheet.create({
  header: {
    ...styles.mh20,
    ...styles.mv15,
    ...styles.rowSpaceBetween,
  },
  crossBtn: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(8),
  },
  container: {
    ...styles.rowSpaceBetween,
    ...styles.mh20,
    ...styles.mv10,
  },
  Container2: {
    ...styles.mh20,
    ...styles.mv10,
  },
  rating: {
    ...styles.flexRow,
    ...styles.mv10,
    ...styles.g10,
  },
});
