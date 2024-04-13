import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import GSafeAreaView from '../../components/common/GSafeAreaView';
import GHeader from '../../components/common/GHeader';
import strings from '../../i18n/strings';
import {colors, styles} from '../../themes';
import {MyFavoriteList} from '../../Api/constant';
import {moderateScale} from '../../common/constants';
import GText from '../../components/common/GText';
import {Cart_2, Delete, EmptySaveList} from '../../assets/svgs';
import GButton from '../../components/common/GButton';
import {getDeviceType} from '../../utils/helpers';
import EmptyListComponent from '../../components/customComponent.js/EmptyListComponent';

const Save = ({navigation}) => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getFavoriteList = () => {
    // Api call
    setFavoriteList(MyFavoriteList);
  };

  useEffect(() => {
    // Api call
    // getFavoriteList();
  }, []);
  const refresh = () => {
    setRefreshing(true);
    getFavoriteList();
    setRefreshing(false);
  };

  const deleteItem = index => {
    let temp = [...favoriteList];
    temp.splice(index, 1);
    setFavoriteList(temp);
  };
  
  const favoriteItem = ({item, index}) => {
    return (
      <View style={localStyles.item}>
        <View style={styles.flexRow}>
          <Image
            source={item.imageLink}
            resizeMode="contain"
            style={{width: moderateScale(80), height: moderateScale(80)}}
          />
          <View style={styles.ml20}>
            <GText type="m16" color={colors.textColor}>
              {item.productName}
            </GText>
            <GText type="m14" color={colors.labelColor} style={styles.mt5}>
              {item.wight} {strings.kg}
            </GText>
            <GText type="m20" color={colors.textColor} style={styles.mt15}>
              {strings.$}
              {item.revisedPrice}
            </GText>
          </View>
        </View>
        <View style={localStyles.container}>
          <GButton
            onPress={() => deleteItem(index)}
            icon={<Delete />}
            containerStyle={{height: moderateScale(0)}}
          />
          <GButton icon={<Cart_2 />} containerStyle={{height: 0}} />
        </View>
      </View>
    );
  };
  const navigateToHome = () => {
    navigation.navigate('Home');
  };
  const ListEmptyComponent = ({item, index}) => {
    return (
      <>
        <EmptyListComponent
          icon={<EmptySaveList />}
          title={strings.oops}
          description={strings.yourSaveListIsEmpty}
          btnTitle={strings.startAdding}
          onPress={navigateToHome}
        />
      </>
    );
  };
  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={strings.myFaovriteList} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={
          favoriteList.length == 0 && [styles.flexGrow1, styles.justifyCenter]
        }
        style={localStyles.listStyle}
        data={favoriteList}
        renderItem={favoriteItem}
        showsVerticalScrollIndicator={false}
        onRefresh={refresh}
        refreshing={refreshing}
        ListEmptyComponent={ListEmptyComponent}
      />
    </GSafeAreaView>
  );
};

export default Save;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.appblack,
  },
  listStyle: {
    ...styles.mt25,
    ...styles.mh20,
    ...styles.flex,
    marginBottom: getDeviceType() == 1 ? moderateScale(70) : moderateScale(50),
  },
  item: {
    ...styles.mv10,
    ...styles.mh10,
    ...styles.rowSpaceBetween,
    paddingBottom: moderateScale(15),
    borderBottomWidth: 1,
    borderColor: colors.shadow2,
  },
  container: {
    ...styles.justifyBetween,
    ...styles.g55,
  },
});
