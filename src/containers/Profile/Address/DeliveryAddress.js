import {StyleSheet, FlatList, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import GSafeAreaView from '../../../components/common/GSafeAreaView';
import GHeader from '../../../components/common/GHeader';
import {StackNav} from '../../../navigation/NavigationKeys';
import {styles, colors} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import {deliveryAddress} from '../../../Api/constant';
import {
  Delete_2,
  Edit,
  Plus,
  RadioFilled,
  RadioUnfilled,
} from '../../../assets/svgs';
import GText from '../../../components/common/GText';
import GButton from '../../../components/common/GButton';

const DeliveryAddress = ({navigation}) => {
  const [addressList, setAddressList] = useState(deliveryAddress);

  const selectAddress = index => {
    let temp = [...addressList];
    temp.map((item, i) => {
      if (i === index) {
        item.isDefault = true;
      } else {
        item.isDefault = false;
      }
    });
    setAddressList(temp);
  };

  const deleteAddress = index => {
    let temp = [...addressList];
    temp.splice(index, 1);
    setAddressList(temp);
  };

  const editAddress = item => navigation.navigate(StackNav.NewAddress, {item});

  const AddressItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectAddress(index);
        }}
        style={localStyles.addressContainer}>
        <View style={styles.mt5}>
          {item.isDefault ? <RadioFilled /> : <RadioUnfilled />}
        </View>
        <View style={localStyles.addressText}>
          <GText type="m16">{item.addressLink2}</GText>
          <GText type="m16" color={colors.labelColor}>
            {item.city},{item.state}
          </GText>
          <GText type="m16">{item.contactNo}</GText>
        </View>
        <View style={[styles.justifyBetween]}>
          <TouchableOpacity onPress={() => editAddress(item)}>
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteAddress(index)}>
            <Delete_2 />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GSafeAreaView style={localStyles.root}>
      <GHeader headerTitle={StackNav.DeliveryAddress} />
      <View style={localStyles.bgContainer}>
        <View style={localStyles.container}>
          <FlatList
            data={addressList}
            renderItem={AddressItem}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
          />
          <View style={localStyles.floatingButton}>
            <GButton
              containerStyle={localStyles.btn}
              bgColor={colors.green}
              icon={<Plus />}
            />
          </View>
        </View>
      </View>
    </GSafeAreaView>
  );
};

export default DeliveryAddress;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  container: {
    ...styles.flex,
    ...styles.mv30,
    ...styles.mb40,
    ...styles.mh20,
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
  },
  bgContainer: {
    backgroundColor: colors.grayscale2,
    flex: 1,
  },
  addressContainer: {
    ...styles.flex,
    ...styles.flexRow,
    ...styles.mh20,
    ...styles.mt30,
    ...styles.pb30,
    borderBottomWidth: 1,
    borderBottomColor: colors.shadow2,
  },
  addressText: {
    flex: 8,
    ...styles.g5,
    ...styles.ml20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20),
  },
  btn: {
    ...styles.p15,
    borderRadius: moderateScale(30),
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    elevation: 10,
  },
});
