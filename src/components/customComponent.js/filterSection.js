import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import GText from '../common/GText';
import {moderateScale} from '../../common/constants';
import {styles, colors} from '../../themes';

const FilterSection = ({
  title,
  displayList,
  setDisplayList,
  list,
  selectedList,
  setSelectedList,
}) => {
  const renderItemFilterItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={[
          localStyles.filterItem,
          {
            borderColor: colors.green,
            backgroundColor: checkSelected(item) ? colors.green : colors.white,
          },
        ]}>
        <GText
          type="m14"
          color={checkSelected(item) ? colors.white : colors.labelColor}>
          {item.categoryname}
        </GText>
      </TouchableOpacity>
    );
  };
  const renderItemFooter = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (displayList.length < list.length) {
            setDisplayList(list);
          } else {
            setDisplayList(list.slice(0, 3));
          }
        }}
        style={[
          localStyles.filterItem,
          {
            borderColor: colors.green,
            backgroundColor: colors.white,
          },
        ]}>
        <GText type="m14" color={colors.labelColor}>
          {displayList.length < list.length
            ? strings.see_all
            : strings.see_less}
        </GText>
      </TouchableOpacity>
    );
  };
  const onPressItem = item => {
    if (selectedList.includes(item.categoryname)) {
      let temp = selectedList.filter(list => list !== item.categoryname);
      setSelectedList(temp);
    } else {
      setSelectedList([...selectedList, item.categoryname]);
    }
  };
  const checkSelected = item => {
    return selectedList.includes(item.categoryname);
  };

  return (
    <View style={localStyles.section}>
      <GText type="b16">{title}</GText>
      <FlatList
        data={displayList}
        scrollEnabled={false}
        renderItem={renderItemFilterItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        ListFooterComponent={renderItemFooter}
      />
    </View>
  );
};

export default FilterSection;

const localStyles = StyleSheet.create({
  filterItem: {
    width: '30%',
    margin: '1%',
    ...styles.pv10,
    ...styles.center,
    borderRadius: moderateScale(8),
    borderWidth: 1,
  },
  section: {
    ...styles.mv15,
    ...styles.g20,
  },
});
